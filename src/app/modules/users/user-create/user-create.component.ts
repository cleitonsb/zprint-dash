import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../../../services/location.service";
import {NotificationService} from "../../../services/notification.service";
import {User} from "../../../models/user";
import {NgxSpinnerService} from "ngx-spinner";
import {msg} from "../../../variables/msg";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  titulo: string = 'Usuários';
  subTitulo: string = 'Cadastro'
  urlBreadcrumb: string = 'users'

  estates: any;
  cities: any;
  avatar: any;

  user = new User();

  constructor(
    private service: UserService,
    private location: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private msg: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => this.view(params.id));
    this.location.getEstates().subscribe((data: any) => {
      this.estates = data;
      this.spinner.hide();
    });

    this.user.avatar = '/assets/img/theme/profile2.png';
  }

  view(id){
    if(id) {
      this.service.get(id).subscribe((data: any) => {
        this.user = data.data;
        this.getCities(this.user.endereco.cidade.estado_id);
      });
    }
  }

  getCities(estate_id) {
    this.spinner.show();
    this.location.getCities(estate_id).subscribe((data: any) => this.cities = data);
    this.spinner.hide();
  }

  save() {
    this.spinner.show();
    this.service.store(this.user, this.avatar).subscribe((response: any) => {
      if(response.status == 200) {
        this.msg.sucess(msg.sucesso);
        if(response.body.id) {
          this.router.navigate(['/user/' + response.body.id]);
        }
      }

      this.spinner.hide();
    });
  }

  fileEvent(event) {
    if(event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
    }
  }
}
