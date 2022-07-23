import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clock-sel',
  templateUrl: './clock-sel.component.html',
  styleUrls: ['./clock-sel.component.css']
})
export class ClockSelComponent implements OnInit {

  titulo = 'Ponto';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'clocks';
  total: Number;
  innerHeight: number;
  usuarios: any;
  usuario: User = null;
  data: any = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,    
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.data = this.datePipe.transform(new Date(), 'MM/yyyy').toString();

    this.innerHeight = window.innerHeight;

    /** usuarios */
    this.userService.getByParam().subscribe((response: any) => {
      this.usuarios = response;
      this.spinner.hide();
    });
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.buscar();
    }
  }

  buscar() {
    if(this.valida()) {
      this.router.navigate(['/clock/' + this.usuario + '/' + this.data]);
    }
  }

  valida() {
  
    if(this.usuario == null || this.usuario == undefined) {
      this.notify.error('Favor selecionar um usuário');
      return false;
    }

    if(this.data == null || this.data == undefined) {
      this.notify.error('Favor informar o período');
      return false;
    }else{
      this.data = this.data.replace('/', '');
    }

    return true;
  }

}
