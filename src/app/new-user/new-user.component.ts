import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {User} from '../user';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalsComponent} from '../modals/modals.component';
import {DialogService} from 'ng2-bootstrap-modal';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;
  errors: string[];
  messages: string[];

  userForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl()
  });

  constructor(private usersService: UsersService, private router: Router,  private dialogService: DialogService) {}

    showConfirmCreate() {
        const disposable = this.dialogService.addDialog(ModalsComponent, {
            keyword: 'Create',
            title: 'New user',
            message: 'Are you sure you want to create new user?'})
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.usersService.createUser(this.userForm.value).subscribe(createdUser => {
                            this.messages = createdUser.message;
                            setTimeout(() => this.router.navigate(['/users']), 3000);
                        },
                        err => {
                            this.errors = err;
                        });
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        },10000);
    }

  ngOnInit() {
  }

}
