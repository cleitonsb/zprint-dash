import { Routes } from '@angular/router';

import {AuthGuard} from '../../helpers/auth.guard';
import {UserListComponent} from '../../modules/users/user-list/user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';

export const UserRoutes: Routes = [
    { path: 'users',          component: UserListComponent,   canActivate: [AuthGuard] },
    { path: 'user/create',   component: UserCreateComponent, canActivate: [AuthGuard] },
    { path: 'user/:id',      component: UserCreateComponent,   canActivate: [AuthGuard] },
    { path: 'user/:id/edit', component: UserCreateComponent, canActivate: [AuthGuard] },
    { path: 'user/change-pass', component: UserCreateComponent, canActivate: [AuthGuard] },
];
