import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { Routes } from '@angular/router';
import {AuthGuard} from '../../helpers/auth.guard';

export const PurchasesRoutes: Routes = [
    { path: 'purchases',         component: PurchaseListComponent,   canActivate: [AuthGuard] },
    { path: 'purchase/create',   component: PurchaseCreateComponent, canActivate: [AuthGuard] },
    { path: 'purchase/:id',      component: PurchaseCreateComponent,   canActivate: [AuthGuard] },
];
