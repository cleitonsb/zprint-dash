import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonListComponent } from './person-list/person-list.component';
import { Routes } from '@angular/router';

import {AuthGuard} from '../../helpers/auth.guard';

export const PeopleRoutes: Routes = [
    { path: 'people',          component: PersonListComponent,   canActivate: [AuthGuard] },
    { path: 'person/create',   component: PersonCreateComponent, canActivate: [AuthGuard] },
    { path: 'person/:id/edit', component: PersonCreateComponent, canActivate: [AuthGuard] },
];
