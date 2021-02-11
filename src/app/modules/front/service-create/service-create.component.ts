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
import { EquipmentService } from 'src/app/services/equipment.service';
import { PaymentBill } from 'src/app/models/paymentBill';
import { environment  } from "../../../../environments/environment";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {

  @ViewChild('btnFinalizar') btnFinalizar: ElementRef;  
  @ViewChild('clienteSwal') private clienteSwal: SwalComponent;
  @ViewChild('equipamentoSwal') private equipamentoSwal: SwalComponent;
  @ViewChild('cancelarSwal') private cancelarSwal: SwalComponent;

  titulo = 'Serviços';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'front/services';
  total: Number;

  innerHeight: number;

  servico: Service;
  formEdit = true;

  usuarios: any;
  usuario: User;
  responsavel: User;
  clientes: any;
  cliente: Person;
  products: any;
  produto: Product;
  equipamentos = [];

  qt = 1;
  subtotal = 0;
  servicoDesconto = 0;
  valorEntrada = 0;

  usuarioCanc: string;
  senhaCanc: string;

  constructor(
    private service: ServiceService,
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private equipmentService: EquipmentService,
    private elRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;

    /** usuarios */
    this.userService.getByParam().subscribe((response: any) => {
      this.usuarios = response;
    });

    /** produtos */
    this.productService.getProdServiceByParam().subscribe((response: any) => {
      this.products = response;
    });

    this.formEdit = true;

    this.montaTela();

  }

  montaTela() {
    const currentUser: any = this.authenticationService.currentUserValue;
    this.usuario = currentUser.user;

    this.servico = new Service();
    this.servico.data = new Date();
    this.servico.usuario = new User();
    this.servico.equipamento = new Equipment();
    this.servico.pessoa = new Person();
    this.servico.usuario.id = this.usuario.id;
    this.servico.responsavel = new User();
    this.servico.total = 0;
    this.servico.desconto = 0;

    this.equipamentos = [];
    this.qt = 1;
    this.subtotal = 0;
    this.servicoDesconto = 0;
    this.valorEntrada = 0;

    /** pessoas */
    this.personService.getByParam().subscribe((response: any) => {
      this.clientes = response;
    });

    this.route.params.subscribe((params) => this.getServico(params.id));
  }

  getServico(id) {
    if(!id) return;
    this.service.get(id).subscribe((data: Service) => {
      this.servico = data;
      this.calcTotal();
      this.spinner.hide();           
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  @HostListener('document:keydown', ['$event'])
  detectKey(e: KeyboardEvent) {
    if (e.key === 'F8') {
      
    }

    if (e.key === 'F9') {
      this.btnFinalizar.nativeElement.click();
    }
  }

  edit() {
    this.formEdit = true;
  }

  setProduto(prod: Product) {
    this.produto = prod;
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      console.log(event);
    }
  }

  setCliente() {
    this.equipmentService.getByPerson(1).subscribe((response: any) => {
      this.equipamentos = response;
    });

    if(this.servico.pessoa.id != null) {
      this.equipmentService.getByPerson(this.servico.pessoa.id).subscribe((response: any) => {
        this.equipamentos = response;
      });
    }
  }

  buscaProduto(term: string, produto: Product) {

    let bolCodigo: boolean;
    let bolEan: boolean;
    let bolNome: boolean;

    if (term !== '') {
    term = term.toLocaleLowerCase();

    if (produto.codigo != null) {
        const codigo = produto.codigo.toLocaleLowerCase() ;
        bolCodigo = codigo.indexOf(term) !== -1;
      }

      if (produto.ean != null) {
        const ean = produto.ean.toLocaleLowerCase();
        bolEan = ean.indexOf(term) !== -1;
      }

      if (produto.nome != null) {
        const nome = produto.nome.toLocaleLowerCase();
        bolNome = nome.indexOf(term) !== -1;
      }
    }

    return bolNome || bolEan || bolCodigo;
  }

  addProduto() {
    if (this.produto.id == null) {
      this.notify.error(msg.E005);
      return;
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

  /**
   * Registra o serviço
   */
  finalizar() {

    if (this.servico.desconto > this.servico.total) {
      this.notify.error(msg.custom(msg.E007, 'do desconto'));
      return;
    }

    if (this.valorEntrada > this.servico.total) {
      this.notify.error(msg.custom(msg.E007, 'da entrada'));
      return;
    }

    if(!this.servico.pessoa.id || this.servico.pessoa.id == 0) {
      this.notify.warning(msg.custom(msg.E006, 'Cliente'));
      return;
    }

    if(!this.servico.responsavel.id || this.servico.responsavel.id == 0) {
      this.notify.warning(msg.custom(msg.E006, 'Responsável'));
      return;
    }

    /** gera a primeira conta, caso o serviço tenha entrada */
    if(this.valorEntrada != 0 && this.valorEntrada != null) {
      const conta = new PaymentBill();
      conta.dataPagamento = new Date();
      conta.dataVencimento = new Date();
      conta.planoConta.id = 7; // -- serviço
      conta.tipoConta = 'RECEBIMENTO';
      conta.usuario = this.usuario;
      conta.valor = this.valorEntrada;

      delete conta.caixa;

      this.servico.contas.push(conta);
    }

    /** gera a conta do valor restante */
    const contaR = new PaymentBill();
    contaR.dataPagamento = new Date();
    contaR.dataVencimento = new Date();
    contaR.planoConta.id = 7; // -- serviço
    contaR.tipoConta = 'RECEBIMENTO';
    contaR.usuario = this.usuario;
    contaR.valor = this.servico.total - this.valorEntrada - this.servico.desconto;

    delete contaR.caixa;

    this.servico.contas.push(contaR); 

    /** limpa IDs registros novos */
    if(this.servico.pessoa.id == -1) {
      delete this.servico.pessoa.id;
    }

    if(this.servico.equipamento.id == -1) {
      delete this.servico.equipamento.id;
    }

    this.service.store(this.servico).subscribe((response: any) => {
      if (response.status === 200) {
          this.notify.sucess(msg.S001);
          if (response.body.id) {
            this.montaTela();

            Swal.fire({
              title: 'Impressão',
              showCancelButton: true, 
              focusCancel: true,
              text: 'Deseja imprimir a guia do serviço?', 
              icon: 'question'
            }).then((result) => {
              if (result.isConfirmed) {
                window.open(environment.frontUrl + '/#/front/service-print/' + response.body.id, '_blank')                
              }
            });
          }

          this.spinner.hide();
      }
    });
  }

  checkImpressao() {
    Swal.fire({
      title: 'Impressão',
      showCancelButton: true, 
      focusCancel: true,
      text: 'Deseja imprimir a guia do serviço?', 
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(1);
        
      }
    });
  }

  checkCancelar() {
    if (this.servico.id) {
      this.cancelarSwal.fire();
    }else{
      this.montaTela();
    }
  }

  execCancelar() {   

    this.service.delete(this.servico.id, this.usuarioCanc, this.senhaCanc).subscribe((response: any) => {
      console.log(response)
      if (response.status === 200) {
          this.notify.sucess(msg.S002);
          this.montaTela();
          this.cancelarSwal.dismiss();
          
          this.usuarioCanc = '';
          this.senhaCanc = '';

          this.spinner.hide();
      }
    });
  }

  addCliente() {

    if(this.servico.pessoa.nome == null) {
      this.notify.warning(msg.custom(msg.E006, 'Nome'));
      return;
    }

    const index: number = this.clientes.indexOf(this.cliente);

    if (index !== -1) {
      this.clientes.splice(index, 1);
    }

    this.cliente = new Person();
    this.cliente.id = -1;
    this.cliente.nome = this.servico.pessoa.nome;
    this.cliente.celular = this.servico.pessoa.celular;

    this.clientes = [...this.clientes, this.cliente];
    this.servico.pessoa.id = -1;

    this.clienteSwal.dismiss();
  }

  openEquipamento() {
  
    if(this.servico.pessoa.id != 0 && this.servico.pessoa.id != null) {
      this.equipamentoSwal.fire();
    }else{
      this.notify.warning("Antes de adicionar um equipamento, favor selecionar o cliente!");
    }
  }

  addEquipamento() {   

    if(this.servico.equipamento.marca == null) {
      this.notify.warning(msg.custom(msg.E006, 'Marca'));
      return;
    }

    if(this.servico.equipamento.modelo == null) {
      this.notify.warning(msg.custom(msg.E006, 'Modelo'));
      return;
    }

    const equipamento = new Equipment();
    equipamento.id = -1;
    equipamento.marca = this.servico.equipamento.marca;
    equipamento.descricao = this.servico.equipamento.descricao;
    equipamento.modelo = this.servico.equipamento.modelo;
    equipamento.serie = this.servico.equipamento.serie;

    this.equipamentos = [...this.equipamentos, equipamento];
    this.servico.equipamento.id = -1;
    this.equipamentoSwal.dismiss();
  }
}
