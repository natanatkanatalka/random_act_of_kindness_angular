import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../services/users.service';
import {User} from '../user';

@Injectable()
export class UserResolve implements Resolve<User> {

  constructor(private userService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUser( Number(route.paramMap.get('id')));
  }
}
