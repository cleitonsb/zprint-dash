import { ChartBillService } from './../../../services/chartBill.service';
import { User } from './../../../models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { msg } from './../../../variables/msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentBillService } from './../../../services/paymentBill.service';
import { Component, OnInit } from '@angular/core';
import { PaymentBill } from 'src/app/models/paymentBill';
import { ChartBill } from 'src/app/models/chartBill';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {
  titulo = 'Contas';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'payments';

  payment: PaymentBill;
  formEdit = false;
  usuario: User;
  chartBills: ChartBill;

  constructor(
    private service: PaymentBillService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private chartBillService: ChartBillService,
  ) { }

  ngOnInit(): void {

    const currentUser: any = this.authenticationService.currentUserValue;
    this.usuario = currentUser.user;

    this.payment = new PaymentBill();
    this.payment.usuario.id = this.usuario.id;
    this.payment.valor = 0;
    this.payment.planoConta.id = 0;

    this.chartBillService.getByParam().subscribe((data: any) => {
      this.chartBills = data;
    });

    this.route.params.subscribe((params) => this.view(params.id));
  }

  view(id) {
    if (id) {
      this.spinner.show();

      this.service.get(id).subscribe((data: any) => {
        this.payment = data;

        this.spinner.hide();
      });
    } else {
      this.formEdit = true;
    }
  }

  save() {
    this.spinner.show();
    const user = this.payment.usuario;
    delete this.payment.usuario;

    this.payment.usuario = new User();
    this.payment.usuario.id = user.id;

    this.service.store(this.payment).subscribe((response: any) => {
      if (response.status === 200) {
        this.notify.sucess(msg.S001);
        this.router.navigate(['/payment/' + response.body.id + '/edit']);
        this.spinner.hide();
      }
    });
  }

  edit() {
    this.formEdit = true;
  }

}
