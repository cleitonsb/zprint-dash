import { PaymentBill } from 'src/app/models/paymentBill';
import { AuthenticationService } from './../../../services/authentication.service';
import { User } from './../../../models/user';
import { Venda } from './../../../models/venda';
import { Router } from '@angular/router';
import { msg } from './../../../variables/msg';
import { NotificationService } from 'src/app/services/notification.service';
import { SaleService } from './../../../services/sale.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../../services/product.service';
import { ItemVenda } from './../../../models/itemVenda';
import { Product } from './../../../models/product';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TipoConta } from 'src/app/enums/tipo-conta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {
  @ViewChild('btnDesconto') btnDesconto: ElementRef;
  @ViewChild('btnPesquisar') btnPesquisar: ElementRef;
  @ViewChild('btnCancelar') btnCancelar: ElementRef;
  @ViewChild('btnFinalizar') btnFinalizar: ElementRef;
  @ViewChild('descontoSwal') private descontoSwal: SwalComponent;
  @ViewChild('cancelarSwal') private cancelarSwal: SwalComponent;

  innerHeight: number;

  titulo = 'Vendas';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'sales';

  products: Product[];
  productsLoading = false;

  produto: Product;
  qt = 1;
  itensVenda = new Array<ItemVenda>();
  busca: string;
  descProduto: string;
  precoProduto = 0;

  venda = new Venda();
  subtotal = 0;

  buscaPreco = 0;
  nomeCliente: string;
  vendaDesconto = 0;

  usuario: User;

  usuarioCanc: string;
  senhaCanc: string;

  constructor(
    private productService: ProductService,
    private elRef: ElementRef,
    private spinner: NgxSpinnerService,
    private service: SaleService,
    private notify: NotificationService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const currentUser: any = this.authenticationService.getUser();
    this.usuario = new User();
    this.usuario.id = currentUser.user.id;

    this.venda = new Venda();
    this.venda.total = 0;
    this.venda.desconto = 0;
    this.venda.data = new Date();

    this.getRegistros();

    this.innerHeight = window.innerHeight - 200;

    if (localStorage.getItem('venda')) {
      this.getVenda(localStorage.getItem('venda'));
      localStorage.removeItem('venda');
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight - 200;
  }

  @HostListener('document:keydown', ['$event'])
  detectKey(e: KeyboardEvent) {
    if (e.key === 'F2') {
      this.btnDesconto.nativeElement.click();
    }

    if (e.key === 'F7') {
      this.btnPesquisar.nativeElement.click();
    }

    if (e.key === 'F8') {
      this.btnCancelar.nativeElement.click();
    }

    if (e.key === 'F9') {
      this.btnFinalizar.nativeElement.click();
    }
  }

  save() {
    this.spinner.show();

    const conta = new PaymentBill();
    conta.dataPagamento = new Date();
    conta.dataVencimento = new Date();
    conta.planoConta.id = 6; // -- venda
    conta.tipoConta = 'RECEBIMENTO';
    conta.usuario = this.usuario;
    conta.valor = this.venda.total;

    delete conta.caixa;

    this.venda.contas[0] = conta;
    this.venda.usuario = this.usuario;

    this.service.store(this.venda).subscribe((response: any) => {
      if (response.status === 200) {
          this.notify.sucess(msg.S001);
          if (response.body.id) {
            this.cancelaVenda();
          }

          this.spinner.hide();
      }
    });
  }

  getRegistros() {
    this.productsLoading = true;
    this.venda.usuario = this.usuario;

    this.productService.getByParam().subscribe((data: any) => {
      this.products = data;
      this.productsLoading = false;
      this.elRef.nativeElement.querySelector('#buscaProduto').focus();
    });
  }

  setProduto(prod: Product) {
    this.produto = prod;
    this.descProduto = this.produto.nome;
    this.precoProduto = +this.produto.preco;
  }

  getPreco(prod: Product) {
    this.buscaPreco = +prod.preco;
  }

  addProduto() {
    if (this.produto.id == null) {
      this.notify.error(msg.E005);
      return false;
    }

    const itemVenda = new ItemVenda();
    itemVenda.preco = +this.produto.preco;
    itemVenda.qt = this.qt;
    itemVenda.produto = this.produto;
    itemVenda.nome = this.produto.nome;
    itemVenda.subtotal = this.qt * +this.produto.preco;

    this.venda.itensVenda = [...this.venda.itensVenda, itemVenda];

    this.elRef.nativeElement.querySelector('#buscaProduto').focus();
    this.elRef.nativeElement.querySelector('.ng-value ').remove();
    this.qt = 1;

    this.calcTotal();
    this.produto = new Product();
  }

  calcTotal() {
    this.subtotal = 0;

    this.venda.itensVenda.forEach(element => {
      this.subtotal += element.qt * +element.produto.preco;
    });

    this.venda.total = this.subtotal - this.venda.desconto;
    if (this.venda.total < 0) {
      this.venda.total = this.subtotal;
      this.venda.desconto = 0;
      this.notify.warning(msg.A001);
    }
  }

  removeItem(prod: ItemVenda) {
    const index: number = this.venda.itensVenda.indexOf(prod);

    if (index !== -1) {
      this.venda.itensVenda.splice(index, 1);
    }

    this.calcTotal();
  }

  openDesconto() {
    this.descontoSwal.fire();
  }

  setDeconto() {
    if (this.vendaDesconto > this.venda.total) {
      this.notify.error(msg.E004);
      return false;
    }

    this.venda.desconto = this.vendaDesconto;

    this.calcTotal();
    this.descontoSwal.dismiss();
  }

  cancelaVenda() {
    this.venda = new Venda();
    this.venda.desconto = 0;
    this.venda.total = 0;
    this.venda.itensVenda = [];

    this.descProduto = '';
    this.precoProduto = 0;
    this.subtotal = 0;
    this.nomeCliente = '';
    this.vendaDesconto = 0;    
  }

  checkCancelarVenda() {
    if (this.venda.id) {
      this.cancelarSwal.fire();
    }else{
      this.cancelaVenda();
    }
  }

  execCancelar() {      
    this.service.delete(this.venda.id, this.usuarioCanc, this.senhaCanc).subscribe((response: any) => {
      console.log(response)
      if (response.status === 200) {
          this.notify.sucess(msg.S002);
          this.cancelaVenda();
          this.descontoSwal.dismiss();
          this.usuarioCanc = '';
          this.senhaCanc = '';

          this.spinner.hide();
      }
    });
  }

  buscaProduto(term: string, produto: Product) {

    let bolCodigo: boolean;
    let bolEan: boolean;
    let bolNome: boolean;

    if (term !== '') {
    term = term.toLocaleLowerCase();

    if (produto.codigo !== undefined && produto.codigo != null) {
        const codigo = produto.codigo.toLocaleLowerCase() ;
        bolCodigo = codigo.indexOf(term) !== -1;
      }

      if (produto.ean !== undefined && produto.ean != null) {
        const ean = produto.ean.toLocaleLowerCase();
        bolEan = ean.indexOf(term) !== -1;
      }

      if (produto.nome !== undefined && produto.nome != null) {
        const nome = produto.nome.toLocaleLowerCase();
        bolNome = nome.indexOf(term) !== -1;
      }
    }

    return bolNome || bolEan || bolCodigo;
  }

  getVenda(id) {
    this.service.get(id).subscribe((data: Venda) => {
      this.venda = data;

      delete this.venda.usuario;
      this.venda.usuario = new User();
      this.venda.usuario.id = this.usuario.id;

      this.venda.itensVenda.forEach(element => {
        this.subtotal += +element.preco * element.qt;
      });

      this.vendaDesconto = this.venda.desconto;
      this.calcTotal();
    });
  }

  finalizarVenda() {
    if (!this.venda.nome) {
      Swal.fire({
        title: 'Nome do cliente',
        input: 'text',
        preConfirm: (usuario) => {
          if (usuario === '') {
            this.notify.error(msg.E003);
          } else {
            this.venda.nome = usuario;
            this.save();
          }
        }
      });
    } else {
      this.save();
    }
  }

}
