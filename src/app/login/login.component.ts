import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  errors: string[];

  constructor(private loginService: LoginService, private router: Router) { }


  login(): void {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
          console.log('test');
          localStorage.setItem('access_token', data.token);
          this.router.navigate(['/users']);
      },
      err => {
        console.log(err);
        const arr = [err.error.message];
        this.errors = arr;
      });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required,
      ]),
      password: new FormControl(this.password, [
        Validators.required
      ])
    });
  }

}
