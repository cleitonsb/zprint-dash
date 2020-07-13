import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleShowComponent } from './role-show/role-show.component';
import {RouterModule} from "@angular/router";
import {RoleRoutes} from "./roles.routing";
import {NgxMaskModule} from "ngx-mask";
import {PaginatorModule} from "../../components/paginator/paginator.module";

@NgModule({
  declarations: [RoleCreateComponent, RoleListComponent, RoleShowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RoleRoutes),
    NgxMaskModule.forRoot(),
    PaginatorModule
  ]
})
export class RolesModule { }
