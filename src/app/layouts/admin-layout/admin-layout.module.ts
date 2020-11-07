import { PurchasesModule } from './../../modules/purchases/purchases.module';
import { PaymentsModule } from './../../modules/payments/payments.module';
import { FrontModule } from './../../modules/front/front.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UsersModule} from '../../modules/users/users.module';
import {NgxMaskModule} from 'ngx-mask';
import {RolesModule} from '../../modules/roles/roles.module';
import {ProductsModule} from '../../modules/products/products.module';
import { PeopleModule } from 'src/app/modules/people/people.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    FrontModule,
    PaymentsModule,
    PurchasesModule,
    PeopleModule,
    NgxMaskModule.forRoot(),
  ],
})

export class AdminLayoutModule {}
