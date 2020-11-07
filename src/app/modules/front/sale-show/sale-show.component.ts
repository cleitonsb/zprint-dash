import { ItemVenda } from './../../../models/itemVenda';
import { Venda } from './../../../models/venda';
import { NgxSpinnerService } from 'ngx-spinner';
import { SaleService } from './../../../services/sale.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sale-show',
  templateUrl: './sale-show.component.html',
  styleUrls: ['./sale-show.component.css']
})
export class SaleShowComponent implements OnInit {
  innerHeight: number;

  titulo = 'Vendas';
  subTitulo = 'Detalhes';
  urlBreadcrumb = 'front/sales';

  venda = new Venda();
  subtotal = 0;
  totalPago = 0;
  desconto = 0;
  total = 0;
  itensVenda: Array<ItemVenda>;

  constructor(private service: SaleService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

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

      this.service.get(id).subscribe((data: Venda) => {
        this.venda = data;

        this.venda.itensVenda.forEach(element => {
          this.subtotal += +element.preco * element.qt;
        });

        this.venda.contas.forEach(contaElement => {
          contaElement.pagamentos.forEach(element => {
            this.totalPago += +element.valor;
          });
        });

        this.spinner.hide();
      });
    }
  }

}
