import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import {RouterModule} from '@angular/router';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';
import {PaginatorModule} from '../../components/paginator/paginator.module';
import {ComponentsModule} from '../../components/components.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ProductRoutes} from './products.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    NgxMaskModule.forRoot(),
    FormsModule,
    PaginatorModule,
    ComponentsModule,
    NgbModule,
    SweetAlert2Module,
    NgxPaginationModule
  ],
  declarations: [ProductListComponent, ProductShowComponent, ProductCreateComponent]
})
export class ProductsModule { }
