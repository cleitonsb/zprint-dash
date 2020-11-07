import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PeopleRoutes } from './people.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonListComponent } from './person-list/person-list.component';

@NgModule({
  declarations: [PersonCreateComponent, PersonListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PeopleRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    ComponentsModule,
    NgbModule,
    SweetAlert2Module,
    NgxPaginationModule
  ]
})
export class PeopleModule { }
