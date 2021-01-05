import { PaymentBillService } from './../../../services/paymentBill.service';
import { PaymentBill } from './../../../models/paymentBill';
import { Router } from '@angular/router';
import { PaymentService } from './../../../services/payment.service';
import { Cashier } from './../../../models/cashier';
import { NotificationService } from './../../../services/notification.service';
import { msg } from './../../../variables/msg';
import { TipoPagamento } from './../../../enums/tipo-pagamento';
import { Payment } from './../../../models/payment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../services/authentication.service';
import { CashierService } from './../../../services/cashier.service';
import { SaleService } from './../../../services/sale.service';
import { Venda } from './../../../models/venda';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ChartBill } from 'src/app/models/chartBill';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  @ViewChild('abreCaixaSwal') private caixaSwal: SwalComponent;
  @ViewChild('tpPagamentoSwal') private tpPagamentoSwal: SwalComponent;
  @ViewChild('fechaCaixaSwal') private fechaCaixaSwal: SwalComponent;
  @ViewChild('btnFinalizar') btnFinalizar: ElementRef;

  innerHeight: number;
  disableDinheiro = null;

  titulo = 'Vendas';
  subTitulo = 'Caixa';
  urlBreadcrumb = 'cashier';

  venda = new Venda();
  conta = new PaymentBill();
  contas: Array<Venda>;
  pagamento = new Payment();
  resPagamentos: any;

  subtotal = 0;

  caixa = new Cashier();
  usuario: any;
  textResultado = 'Troco';
  resultado = 0;
  totalPago = 0;

  eTipoPagamento = TipoPagamento;
  vPagamento: string;
  fContagem = 0;
  fTotal = 0;

  constructor(
    private salesService: SaleService,
    private cashierService: CashierService,
    private paymentService: PaymentService,
    private paymentBill: PaymentBillService,
    private authenticationService: AuthenticationService,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight - 200;
    this.checkCaixa();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight - 200;
  }

  @HostListener('document:keydown', ['$event'])
  detectKey(e: KeyboardEvent) {
    if (e.key === 'F9') {
      this.btnFinalizar.nativeElement.click();
    }
  }

  async getRegistros() {
    this.paymentBill.getByParam('noCaixa').subscribe((data: any) => {
      this.contas = data;
    });

    await this.delayCaixa();
    this.getRegistros();
  }

  getVenda(id: number) {
    this.salesService.get(id).subscribe((data: Venda) => {
      this.clear();
      this.venda = data;
      this.venda.itensVenda.forEach(element => {
        this.subtotal += +element.preco * element.qt;
      });

      this.conta = this.venda.contas[this.venda.contas.length - 1];

      delete this.venda.usuario;
      this.venda.usuario = new User();
      this.venda.usuario.id = this.usuario.id;

      delete this.conta.usuario;
      this.conta.usuario = new User();
      this.conta.usuario.id = this.usuario.id;

    });
  }

  clear() {
    this.venda = new Venda();
    this.pagamento = new Payment();
    this.totalPago = 0;
    this.subtotal = 0;
    this.resultado = 0;
    this.textResultado = 'Troco';
  }

  checkCaixa() {
    const currentUser: any = this.authenticationService.getUser();
    this.usuario = currentUser.user;

    this.cashierService.getOpen().subscribe((data: any) => {
      if (data === null || data === undefined) {
        this.caixa.dataAbertura = new Date();
        this.caixa.usuario.id = this.usuario.id;
        this.caixa.fundo = 0;

        this.caixaSwal.fire();
      } else {
        localStorage.setItem('caixa', data);
        this.caixa = data;
        this.getRegistros();
      }
    });
  }

  abrirCaixa() {
    this.spinner.show();

    this.cashierService.store(this.caixa).subscribe((response: any) => {
      if (response.status === 200) {
        localStorage.setItem('caixa', response);
        this.getRegistros();

        this.caixaSwal.dismiss();
      }

      this.spinner.hide();
    });
  }

  cancelCaixa() {
    if (!localStorage.getItem('caixa')) {
      this.router.navigate(['/front']);
    }
  }

  addPagamento() {
    this.vPagamento = '';

    if (!this.pagamento.tipoPagamento || !this.pagamento.valor) {
      return false;
    }

    if (this.pagamento.tipoPagamento !== 'DINHEIRO') {

      let total = 0;
      this.conta.pagamentos.forEach(element => {
        total += element.valor;
      });

      total += this.pagamento.valor;

      if (total > this.venda.total) {
        this.vPagamento = msg.E004;
        return false;
      }
    } else {
      this.disableDinheiro = true;
    }

    this.conta.pagamentos = [...this.conta.pagamentos, this.pagamento];
    this.pagamento = new Payment();

    this.calcTotal();

    this.tpPagamentoSwal.dismiss();
  }

  calcTotal() {
    this.totalPago = 0;
    this.conta.pagamentos.forEach(element => {
      this.totalPago += element.valor;
    });

    this.conta.troco = this.totalPago - this.venda.total;
    this.textResultado = (this.conta.troco >= 0) ? 'Troco' : 'Restante';
  }

  removeItem(pag: Payment) {
    const index: number = this.conta.pagamentos.indexOf(pag);

    if (index !== -1) {
      this.conta.pagamentos.splice(index, 1);
    }

    this.calcTotal();

    if (pag.tipoPagamento === 'DINHEIRO') {
      this.disableDinheiro = null;
    }
  }

  finalizaVenda() {
    this.spinner.show();

    delete this.venda.usuario;
    delete this.venda.itensVenda;

    this.conta.caixa = new Cashier();
    this.conta.caixa.id = this.caixa.id;

    /** ajuste no valor do pagamento em dinheiro, quando tem troco */
    if (this.conta.troco > 0) {
      this.conta.pagamentos.forEach(element => {
        if (element.tipoPagamento === 'DINHEIRO') {
          /** faço copia do objeto pagamento */
          const nPag = {...element};

          /** removo da lista o objeto original */
          const index: number = this.conta.pagamentos.indexOf(element);
          if (index !== -1) {
            this.conta.pagamentos.splice(index, 1);
          }

          /** add o novo objeto */
          if (this.conta.troco < nPag.valor) {
            nPag.valor = nPag.valor - this.conta.troco;
            this.conta.pagamentos = [...this.conta.pagamentos, nPag];
          }
        }
      });
    }

    this.paymentBill.update(this.conta).subscribe((response: any) => {
      if (response.status === 200) {
          this.notify.sucess(msg.S001);
          if (response.body.id) {
            this.clear();
            this.getRegistros();
          }

          this.spinner.hide();
      }
    });
  }

  delayCaixa() {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }

  fecharCaixa() {
    this.fTotal = 0;

    this.paymentService.getByCashier(this.caixa.id).subscribe((data: any) => {
      this.resPagamentos = data;
      this.resPagamentos.forEach(element => {
        if (element[0] === 'DINHEIRO') {
          this.fTotal += element[1];
        }
      });

      this.fTotal += this.caixa.fundo;

      this.fechaCaixaSwal.fire();
    });
  }

  confirmFechamento() {
    Swal.fire({
      title: 'Fechamento de caixa',
      text: 'Confirma o fechamento do caixa?',
      icon: 'question',
      showCancelButton: true,
    }).then(resultC => {
      if (resultC.isConfirmed) {
        this.saveFechamento();
      }
    });
  }

  saveFechamento() {
    this.spinner.show();

    this.caixa.dataFechamento = new Date();
    this.caixa.quebra = this.fTotal - this.fContagem;
    this.caixa.usuario = this.usuario;

    this.cashierService.close(this.caixa).subscribe((response: any) => {
      if (response.status === 200) {
        this.notify.sucess(msg.S003);
        this.router.navigate(['/front']);
      }

      localStorage.removeItem('caixa');

      this.spinner.hide();
    });
  }
}
