import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProductService } from './../../../services/product.service';
import { ItemServico } from './../../../models/itemServico';
import { msg } from './../../../variables/msg';
import { Product } from './../../../models/product';
import { Equipment } from './../../../models/equipment';
import { ChartBillService } from './../../../services/chartBill.service';
import { PersonService } from './../../../services/person.service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from './../../../services/service.service';
import { Service } from './../../../models/service';
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {

  @ViewChild('btnDesconto') btnDesconto: ElementRef;
  @ViewChild('btnPesquisar') btnPesquisar: ElementRef;
  @ViewChild('btnCancelar') btnCancelar: ElementRef;
  @ViewChild('btnFinalizar') btnFinalizar: ElementRef;
  @ViewChild('clienteSelect') clienteSelect: ElementRef;
  @ViewChild('clienteInput') clienteInput: ElementRef;
  @ViewChild('descontoSwal') private descontoSwal: SwalComponent;
  @ViewChild('clienteSwal') private clienteSwal: SwalComponent;


  titulo = 'Serviços';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'front/services';
  total: Number;

  innerHeight: number;

  servico: Service;
  formEdit = true;

  usuarios: any;
  usuario: User;
  clientes: any;
  cliente: Person;
  products: any;
  produto: Product;
  equipamentos: any;

  qt = 1;
  subtotal = 0;
  servicoDesconto = 0;
  valorEntrada = 0;

  clienteDefault: Person;

  constructor(
    private service: ServiceService,
    private userService: UserService,
    private personService: PersonService,
    private chartBillService: ChartBillService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private elRef: ElementRef,
  ) { }

  ngOnInit(): void {

    this.innerHeight = window.innerHeight;

    const currentUser: any = this.authenticationService.currentUserValue;
    this.usuario = currentUser.user;

    this.servico = new Service();
    this.servico.usuario = new User();
    this.servico.equipamento = new Equipment();
    this.servico.pessoa = new Person();
    this.servico.usuario.id = this.usuario.id;

    /** pessoas */
    this.personService.getByParam().subscribe((response: any) => {
      this.clientes = response;
    });

    /** usuarios */
    this.userService.getByParam().subscribe((response: any) => {
      this.usuarios = response;
    });

    /** produtos */
    this.productService.getByParam().subscribe((response: any) => {
      this.products = response;
    });

    this.formEdit = true;

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
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
  }

  edit() {
    this.formEdit = true;
  }

  setCliente(cli: Person) {
    this.cliente = cli;
  }

  setProduto(prod: Product) {
    this.produto = prod;
  }

  buscaProduto(term: string, produto: Product) {

    let bolCodigo: boolean;
    let bolEan: boolean;
    let bolNome: boolean;

    if (term !== '') {
    term = term.toLocaleLowerCase();

    if (produto.codigo !== undefined) {
        const codigo = produto.codigo.toLocaleLowerCase() ;
        bolCodigo = codigo.indexOf(term) !== -1;
      }

      if (produto.ean !== undefined) {
        const ean = produto.ean.toLocaleLowerCase();
        bolEan = ean.indexOf(term) !== -1;
      }

      if (produto.nome !== undefined) {
        const nome = produto.nome.toLocaleLowerCase();
        bolNome = nome.indexOf(term) !== -1;
      }
    }

    return bolNome || bolEan || bolCodigo;
  }

  addProduto() {
    if (this.produto.id == null) {
      this.notify.error(msg.E005);
      return false;
    }

    const itemServico = new ItemServico();
    itemServico.preco = +this.produto.preco;
    itemServico.qt = this.qt;
    itemServico.produto = this.produto;
    itemServico.subtotal = this.qt * +this.produto.preco;

    this.servico.itensServico = [...this.servico.itensServico, itemServico];

    this.elRef.nativeElement.querySelector('#buscaProduto').focus();
    this.elRef.nativeElement.querySelector('.ng-value ').remove();
    this.qt = 1;

    this.calcTotal();
    this.produto = new Product();
  }

  calcTotal() {
    this.subtotal = 0;

    this.servico.itensServico.forEach(element => {
      this.subtotal += element.qt * +element.produto.preco;
    });

    this.servico.total = this.subtotal - this.servico.desconto;
    if (this.servico.total < 0) {
      this.servico.total = this.subtotal;
      this.servico.desconto = 0;
      this.notify.warning(msg.A001);
    }
  }

  removeItem(prod: ItemServico) {
    const index: number = this.servico.itensServico.indexOf(prod);

    if (index !== -1) {
      this.servico.itensServico.splice(index, 1);
    }

    this.calcTotal();
  }

  openDesconto() {
    this.descontoSwal.fire();
  }

  setDeconto() {
    if (this.servicoDesconto > this.servico.total) {
      this.notify.error(msg.E004);
      return false;
    }

    this.servico.desconto = this.servicoDesconto;

    this.calcTotal();
    this.descontoSwal.dismiss();
  }

  finalizar() {

  }

  cancelar() {

  }

  addCliente() {

    const index: number = this.clientes.indexOf(this.cliente);

    if (index !== -1) {
      this.clientes.splice(index, 1);
    }

    if (this.servico.pessoa.nome !== '') {
      this.cliente = new Person();
      this.cliente.id = -1;
      this.cliente.nome = this.servico.pessoa.nome;
      this.cliente.celular = this.servico.pessoa.celular;

      this.clientes = [...this.clientes, this.cliente];
      this.servico.pessoa.id = -1;
    }

    this.clienteSwal.dismiss();
  }
}
