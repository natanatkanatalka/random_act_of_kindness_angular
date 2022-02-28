import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FilterPipe} from './pipes/pipes';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UsersService} from './services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {NewUserComponent} from './new-user/new-user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserResolve} from './user-details/user.resolver';
import {routing} from './app.routing';
import {Ng4FilesModule} from './ng4-files';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {SiteHeaderComponent} from './_layout/site-header/site-header.component';
import {SiteFooterComponent} from './_layout/site-footer/site-footer.component';
import {UserLayoutComponent} from './_layout/user-layout/user-layout.component';
import {LoginComponent} from './login/login.component';
import {ValidationComponent} from './validators/validation.component';
import {LoginService} from './services/login.service';
import {SuccessMessagesComponent} from './success-messages/success-messages.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import { ModalsComponent } from './modals/modals.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { JwtModule } from '@auth0/angular-jwt';

import {environment} from '../environments/environment';
import { ReceiverComponent } from './receiver/receiver.component';
import {ReceiverResolve} from './receiver/receiver.resolver';

const authConfig = {
    tokenGetter: () => {
        return localStorage.getItem('access_token');
    },
    whitelistedDomains: [environment.url]
}

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserDetailsComponent,
        NewUserComponent,
        PageNotFoundComponent,
        SiteLayoutComponent,
        SiteHeaderComponent,
        SiteFooterComponent,
        UserLayoutComponent,
        LoginComponent,
        ValidationComponent,
        SuccessMessagesComponent,
        FilterPipe,
        ModalsComponent,
        ReceiverComponent
    ],
    entryComponents: [
        ModalsComponent
    ],
    imports: [
        Ng4FilesModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        routing,
        BootstrapModalModule.forRoot({container: document.body}),
        JwtModule.forRoot({
            config: authConfig
        })
    ],
    providers: [
        UsersService,
        UserResolve,
        ReceiverResolve,
        LoginService,
        AuthGuardService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
