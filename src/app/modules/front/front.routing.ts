import { CashierComponent } from './cashier/cashier.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleCreateComponent } from './sale-create/sale-create.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { Routes } from '@angular/router';

import {AuthGuard} from '../../helpers/auth.guard';

export const FrontRoutes: Routes = [
    { path: 'front',              component: AttendanceComponent, canActivate: [AuthGuard] },
    { path: 'front/sale-create',  component: SaleCreateComponent, canActivate: [AuthGuard] },
    { path: 'front/sales',        component: SaleListComponent, canActivate: [AuthGuard] },
    { path: 'front/sale/:id',     component: SaleCreateComponent, canActivate: [AuthGuard] },
    { path: 'front/cashier',      component: CashierComponent, canActivate: [AuthGuard] },
];
