import { Routes } from '@angular/router';

import {AuthGuard} from "../../helpers/auth.guard";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductCreateComponent} from "./product-create/product-create.component";

export const ProductRoutes: Routes = [
    { path: 'products',          component: ProductListComponent,   canActivate: [AuthGuard] },
    { path: 'product/create',   component: ProductCreateComponent, canActivate: [AuthGuard] },
    { path: 'product/:id',      component: ProductCreateComponent,   canActivate: [AuthGuard] },
];
