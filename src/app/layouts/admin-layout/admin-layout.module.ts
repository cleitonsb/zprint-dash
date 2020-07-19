import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UsersModule} from "../../modules/users/users.module";
import {NgxMaskModule} from "ngx-mask";
import {RolesModule} from "../../modules/roles/roles.module";
import {ServicesModule} from "../../modules/services/services.module";
import {ProductsModule} from "../../modules/products/products.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    UsersModule,
    RolesModule,
    ServicesModule,
    ProductsModule,
    NgxMaskModule.forRoot(),
  ],
})

export class AdminLayoutModule {}
