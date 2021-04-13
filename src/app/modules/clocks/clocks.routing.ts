import { Routes } from '@angular/router';

import {AuthGuard} from '../../helpers/auth.guard';
import { ClockListComponent } from './clock-list/clock-list.component';
import { ClockSelComponent } from './clock-sel/clock-sel.component';

export const ClockRoutes: Routes = [
    { path: 'clocks',         component: ClockSelComponent,   canActivate: [AuthGuard] },
    { path: 'clock/:usuario/:periodo',      component: ClockListComponent,   canActivate: [AuthGuard] },    
    { path: 'clock/:usuario',      component: ClockListComponent,   canActivate: [AuthGuard] },    
];
