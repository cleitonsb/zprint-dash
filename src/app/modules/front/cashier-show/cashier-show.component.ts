import { TipoPagamento } from './../../../enums/tipo-pagamento';
import { PaymentService } from './../../../services/payment.service';
import { CashierService } from './../../../services/cashier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from './../../../services/sale.service';
import { Venda } from './../../../models/venda';
import { Cashier } from './../../../models/cashier';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-cashier-show',
  templateUrl: './cashier-show.component.html',
  styleUrls: ['./cashier-show.component.css']
})
export class CashierShowComponent implements OnInit {

  innerHeight: number;

  titulo = 'Caixas';
  subTitulo = 'Detalhes';
  urlBreadcrumb = 'front/cashiers';

  caixa = new Cashier();
  vendas: any;
  resPagamentos: any;
  fContagem = 0;
  fTotal = 0;

  eTpPagamento = TipoPagamento;

  constructor(
    private service: CashierService,
    private salesService: SaleService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight - 200;
    this.route.params.subscribe((params) => this.view(params.id));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight - 200;
  }

  view(id) {
    if (id) {
      this.spinner.show();

      /** Busco o caixa */
      this.service.get(id).subscribe((data: Cashier) => {
        this.caixa = data;

        /** busco as vendas */
        this.service.getItems(id).subscribe((dataV: any) => {
          this.vendas = dataV;

          /** busco os pagamentos */
          this.paymentService.getByCashier(this.caixa.id).subscribe((dataP: any) => {
            this.resPagamentos = dataP;

            this.resPagamentos.forEach(element => {
              this.fTotal += element[1];
            });

            this.fTotal = this.fTotal + this.caixa.fundo - this.caixa.quebra;

          });

          this.spinner.hide();
        });
      });

    }


  }

}
