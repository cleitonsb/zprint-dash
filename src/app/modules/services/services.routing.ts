import { Routes } from '@angular/router';

import {AuthGuard} from "../../helpers/auth.guard";
import {ServiceListComponent} from "./service-list/service-list.component";
import {ServiceCreateComponent} from "./service-create/service-create.component";
import {ServiceShowComponent} from "./service-show/service-show.component";

export const ServiceRoutes: Routes = [
    { path: 'services',         component: ServiceListComponent,   canActivate: [AuthGuard] },
    { path: 'service/create',   component: ServiceCreateComponent, canActivate: [AuthGuard] },
    { path: 'service/:id',      component: ServiceShowComponent,   canActivate: [AuthGuard] },
    { path: 'service/:id/edit', component: ServiceCreateComponent, canActivate: [AuthGuard] },
];
