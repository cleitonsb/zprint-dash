import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  config: object = {
    'timeOut': 5000,
    'positionClass' : 'toast-top-center',
    'toastClass' : 'ngx-toastr',
    'enableHtml' : true,
  }

  constructor(private toastr: ToastrService) { }

  sucess(message, title: string = 'Sucesso!') {
    this.toastr.success(message, title, this.config);
  }

  error(message, title: string = 'Erro!') {
    this.toastr.error(message, title, this.config);
  }

  warning(message, title: string = 'Atenção!') {
    this.toastr.warning(message, title, this.config);
  }

  info(message, title: string = 'Atenção!') {
    this.toastr.info(message, title, this.config);
  }

}
