import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../../services/product.service';
import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;
  titulo = 'Produtos';
  subTitulo = '';
  urlBreadcrumb = 'products';
  total: number;

  paramBusca = '';
  p: string | number;

  constructor(private productService: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.productService.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.products = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }
}
