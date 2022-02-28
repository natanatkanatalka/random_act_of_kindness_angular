import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../services/users.service';
import {User} from '../user';
import {Receiver} from '../../receiver';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReceiverResolve implements Resolve<Receiver> {

    constructor(private userService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getReceiver(route.paramMap.get('uniqueId'));
    }
}
