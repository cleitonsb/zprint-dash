import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { msg } from 'src/app/variables/msg';

@Component({
  selector: 'app-user-pass',
  templateUrl: './user-pass.component.html',
  styleUrls: ['./user-pass.component.css']
})
export class UserPassComponent implements OnInit {

  pass: string;
  passConfirm: string;
  usuario: User;

  constructor(
    private service: UserService,
    private notify: NotificationService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    const currentUser: any = this.authenticationService.getUser();
    this.usuario = currentUser.user;
  }

  save(){
    this.spinner.show();

    if(this.pass != this.passConfirm) {
      this.notify.error(msg.E009);
    }else{
      this.service.storePass(this.usuario.id, this.pass).subscribe((response: any) => {
        if (response.status === 200) {
          this.notify.sucess(msg.S001);
        }

        this.spinner.hide();
      });
    }
  }
}
