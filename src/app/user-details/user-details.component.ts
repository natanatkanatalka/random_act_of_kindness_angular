import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../services/users.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/Rx';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'ng2-bootstrap-modal';
import {ModalsComponent} from '../modals/modals.component';
import set = Reflect.set;

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    user: User;
    userDetailsForm: FormGroup;
    errors: string[];
    messages: string[];

    constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.user = this.route.snapshot.data.user;
        console.log(this.user);
        this.userDetailsForm = new FormGroup({
            name: new FormControl(this.user.name, [
                Validators.required,
                Validators.maxLength(50)
            ]),
            email: new FormControl(this.user.email, [
                Validators.required,
                Validators.email
            ]),
            isActive: new FormControl(this.user.isActive),
            receiver: new FormControl(this.user.receiver)
        });
    }

    showConfirmSave() {
        let disposable = this.dialogService.addDialog(ModalsComponent, {
            keyword: 'Save',
            title: 'Save user',
            message: 'Are you sure you want to save user?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.usersService.updateUser(this.user.id, this.userDetailsForm.value).subscribe((data: any) => {
                            this.messages = data.message;
                            setTimeout(() => this.messages = null, 5000);
                        },
                        err => {
                        this.errorHandle(err);
                        }
                    );
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    showConfirmSendMail() {
        let disposable = this.dialogService.addDialog(ModalsComponent, {
            keyword: 'Send email',
            title: 'Send email to user',
            message: 'Are you sure you want to send email to user?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.usersService.sendMail(this.user.id).subscribe(data => {
                            this.messages = data.message;
                            setTimeout(() => this.messages = null, 5000);
                        },
                        err => {
                            this.errorHandle(err);
                        });
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    showConfirmDelete() {
        let disposable = this.dialogService.addDialog(ModalsComponent, {
            keyword: 'Delete',
            title: 'Delete user',
            message: 'Are you sure you want to delete user?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.usersService.deleteUser(this.user.id).subscribe(msg => {
                            this.messages = msg.message;
                            setTimeout(() => this.router.navigate(['/users']), 3000);
                        },
                        err => {
                            this.errorHandle(err);
                        });
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    showConfirmDeleteReceiver() {
        let disposable = this.dialogService.addDialog(ModalsComponent, {
            keyword: 'Delete',
            title: 'Delete gift receiver',
            message: 'Are you sure you want to delete gift receiver for user?'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.usersService.deleteReceiver(this.user.id).subscribe(msg => {
                            this.messages = msg.message;
                            setTimeout(() => this.messages = null, 5000);
                            // this.router.navigate(['/users']);
                        },
                        err => {
                            this.errorHandle(err);
                        });
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    errorHandle(err) {
        if (err instanceof Array) {
            this.errors = err;
        } else {
            this.errors = [];
            this.errors.push(err.message);
        }
        setTimeout(() => this.errors = null, 5000);
    }
}
