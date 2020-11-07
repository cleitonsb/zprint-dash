import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserShowComponent } from './user-show/user-show.component';
import {RouterModule} from '@angular/router';
import {UserRoutes} from './users.routing';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';
import {PaginatorModule} from '../../components/paginator/paginator.module';
import {ComponentsModule} from '../../components/components.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import localePT from '@angular/common/locales/pt'
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(localePT);

@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserShowComponent],
  imports: [
      CommonModule,
      RouterModule.forChild(UserRoutes),
      NgxMaskModule.forRoot(),
      FormsModule,
      ComponentsModule,
      NgbModule,
      SweetAlert2Module,
      NgxPaginationModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class UsersModule { }
