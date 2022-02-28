import {RouterModule, Routes} from '@angular/router';
import {NewUserComponent} from './new-user/new-user.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserResolve} from './user-details/user.resolver';
import {UsersComponent} from './users/users.component';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {UserLayoutComponent} from './_layout/user-layout/user-layout.component';
import {ReceiverComponent} from './receiver/receiver.component';
import {ReceiverResolve} from './receiver/receiver.resolver';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        component: SiteLayoutComponent,
        children: [
            {
                path: 'users/:id',
                component: UserDetailsComponent,
                resolve: {
                    user: UserResolve
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'user/new',
                component: NewUserComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthGuard]
            },
            {
                path: '',
                component: UsersComponent,
                canActivate: [AuthGuard]
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'receiver/:uniqueId',
        component: ReceiverComponent,
        resolve: {
            receiver: ReceiverResolve
        },
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        redirectTo: 'login'
    },
    {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(appRoutes, {enableTracing: false});
