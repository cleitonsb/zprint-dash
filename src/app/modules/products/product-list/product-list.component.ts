import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatorComponent} from "../../../components/paginator/paginator.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  //products: object = new Product();
  titulo: string = 'Produtos';
  subTitulo: string = '';
  urlBreadcrumb: string = 'products'

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;
  paramBusca: string = '';

  constructor() { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page : number = 1){

  }
}
