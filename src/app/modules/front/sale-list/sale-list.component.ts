import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SaleService } from './../../../services/sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  vendas: any;
  titulo = 'Vendas';
  subTitulo = '';
  urlBreadcrumb = 'front/sales';
  total: Number;

  paramBusca = '';

  constructor(private salesService: SaleService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.salesService.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.vendas = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }

  editVenda(idVenda: string) {
    localStorage.setItem('venda', idVenda);
    this.router.navigate(['/front/sale-create']);
  }
}
