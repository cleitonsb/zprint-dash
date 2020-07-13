import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserShowComponent } from './user-show/user-show.component';
import {RouterModule} from "@angular/router";
import {UserRoutes} from "./users.routing";
import {NgxMaskModule} from "ngx-mask";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "../../components/paginator/paginator.module";
import {ComponentsModule} from "../../components/components.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import localePT from "@angular/common/locales/pt"

registerLocaleData(localePT)

@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserShowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    PaginatorModule,
    ComponentsModule,
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class UsersModule { }
