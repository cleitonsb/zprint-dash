import { PaymentCreateComponent } from './payment-create/payment-create.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { Routes } from '@angular/router';
import {AuthGuard} from '../../helpers/auth.guard';

export const PaymentsRoutes: Routes = [
    { path: 'payments',         component: PaymentListComponent,   canActivate: [AuthGuard] },
    { path: 'payment/:id/edit',     component: PaymentCreateComponent,   canActivate: [AuthGuard] },
    { path: 'payment/create',          component: PaymentCreateComponent,   canActivate: [AuthGuard] },
];
