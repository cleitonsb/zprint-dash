import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FrontRoutes } from './front.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleCreateComponent } from './sale-create/sale-create.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { CashierComponent } from './cashier/cashier.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TestComponent } from './test/test.component';
import { SaleShowComponent } from './sale-show/sale-show.component';
import { CashierListComponent } from './cashier-list/cashier-list.component';
import { CashierShowComponent } from './cashier-show/cashier-show.component';

@NgModule({
  declarations: [
    SaleCreateComponent,
    SaleListComponent,
    CashierComponent,
    AttendanceComponent,
    TestComponent,
    SaleShowComponent,
    CashierListComponent,
    CashierShowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FrontRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    ComponentsModule,
    NgbModule,
    SweetAlert2Module,
    NgxPaginationModule,
    NgSelectModule,
    NgxCurrencyModule,
  ]
})
export class FrontModule { }
