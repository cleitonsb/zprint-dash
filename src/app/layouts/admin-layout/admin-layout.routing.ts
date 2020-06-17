import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {AuthGuard} from "../../helpers/auth.guard";
import {UsersComponent} from "../../pages/users/users.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,    canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent,  canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent,       canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent,        canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent,         canActivate: [AuthGuard] },
    { path: 'users',          component: UsersComponent,        canActivate: [AuthGuard] },
];
