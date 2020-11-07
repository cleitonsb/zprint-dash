import { ServiceCreateComponent } from './service-create/service-create.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { SaleShowComponent } from './sale-show/sale-show.component';
import { CashierShowComponent } from './cashier-show/cashier-show.component';
import { TestComponent } from './test/test.component';
import { CashierComponent } from './cashier/cashier.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleCreateComponent } from './sale-create/sale-create.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { Routes } from '@angular/router';

import {AuthGuard} from '../../helpers/auth.guard';
import { CashierListComponent } from './cashier-list/cashier-list.component';

export const FrontRoutes: Routes = [
    { path: 'front',                  component: AttendanceComponent, canActivate: [AuthGuard] },
    { path: 'front/sale-create',      component: SaleCreateComponent, canActivate: [AuthGuard] },
    { path: 'front/sales',            component: SaleListComponent, canActivate: [AuthGuard] },
    { path: 'front/sale-show/:id',    component: SaleShowComponent, canActivate: [AuthGuard] },
    { path: 'front/cashier',          component: CashierComponent, canActivate: [AuthGuard] },
    { path: 'front/cashiers',         component: CashierListComponent, canActivate: [AuthGuard] },
    { path: 'front/cashier-show/:id', component: CashierShowComponent, canActivate: [AuthGuard] },
    { path: 'front/service-create/:id',  component: ServiceCreateComponent, canActivate: [AuthGuard] },
    { path: 'front/service-create',  component: ServiceCreateComponent, canActivate: [AuthGuard] },
    { path: 'front/services',         component: ServiceListComponent, canActivate: [AuthGuard] },
];
