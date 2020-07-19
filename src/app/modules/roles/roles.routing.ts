import { Routes } from '@angular/router';

import {AuthGuard} from "../../helpers/auth.guard";
import {RoleListComponent} from "./role-list/role-list.component";
import {RoleCreateComponent} from "./role-create/role-create.component";
import {RoleShowComponent} from "./role-show/role-show.component";

export const RoleRoutes: Routes = [
    { path: 'roles',          component: RoleListComponent,   canActivate: [AuthGuard] },
    { path: 'role/create',   component: RoleCreateComponent, canActivate: [AuthGuard] },
    { path: 'role/:id',      component: RoleCreateComponent,   canActivate: [AuthGuard] },
];
