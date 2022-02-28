import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {
  baseUrl = `http://${environment.url}/api`;

  constructor(private http: HttpClient) {
  }

  login(username, password): Observable<any> {
    console.log(this.baseUrl);
    return this.http.post(this.baseUrl + '/login', {username: username, password: password});
  }

}