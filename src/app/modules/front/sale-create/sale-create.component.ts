import { ItemVenda } from './../../../models/itemVenda';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {

  titulo = 'Vendas';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'sales';

  produto: string;
  qt: number;
  itensVenda = new Array<ItemVenda>();

  constructor() { }

  ngOnInit(): void {

    let itemVenda1 = new ItemVenda();
    itemVenda1.id = 1;
    itemVenda1.preco = 2.55;
    itemVenda1.qt = 5;
    itemVenda1.produto = new Product();

    this.itensVenda[0] = itemVenda1;
  }

  save() {

  }

}
