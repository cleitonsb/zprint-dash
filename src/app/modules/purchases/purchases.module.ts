import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PurchasesRoutes } from './purchases.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';

@NgModule({
  declarations: [PurchaseListComponent, PurchaseCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PurchasesRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    ComponentsModule,
    NgbModule,
    SweetAlert2Module,
    NgxPaginationModule
  ]
})
export class PurchasesModule { }
