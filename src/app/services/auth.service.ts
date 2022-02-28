import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    constructor(private jwt: JwtHelperService) {
    }

    isAuthorized(): boolean {
        const token = localStorage.getItem('access_token');
        if (!!token) {
            return (!this.jwt.isTokenExpired(token));
        } else {
            return false;
        }
    }
}
