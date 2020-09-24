import { Cashier } from './../../../models/cashier';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CashierService } from './../../../services/cashier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashier-list',
  templateUrl: './cashier-list.component.html',
  styleUrls: ['./cashier-list.component.css']
})
export class CashierListComponent implements OnInit {

  caixas: Array<Cashier>;
  titulo = 'Caixas';
  subTitulo = '';
  urlBreadcrumb = 'front/cashiers';
  total: Number;

  paramBusca = '';

  constructor(private service: CashierService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.service.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.caixas = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }

}
