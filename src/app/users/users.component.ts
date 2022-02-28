import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  selectedUser: User;
  messages: string[];
  queryString: string;

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  onSelect(user: User): void {
    this.usersService.getUser(user.id).subscribe(() =>{

    });
  }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

}
