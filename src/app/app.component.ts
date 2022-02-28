import { Component,isDevMode } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string = environment.url;
  showCreateUser: boolean;



  constructor() {
    this.showCreateUser = false;
  }
}
