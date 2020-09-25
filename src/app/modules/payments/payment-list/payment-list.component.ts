import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentBillService } from './../../../services/paymentBill.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  contas: any;
  titulo = 'Contas';
  subTitulo = '';
  urlBreadcrumb = 'payments';
  total: Number;

  paramBusca = '';

  constructor(private service: PaymentBillService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.service.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.contas = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }

}
