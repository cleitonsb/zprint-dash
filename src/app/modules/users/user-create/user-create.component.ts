import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';
import {NotificationService} from '../../../services/notification.service';
import {User} from '../../../models/user';
import {NgxSpinnerService} from 'ngx-spinner';
import {msg} from '../../../variables/msg';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  titulo = 'Usuários';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'users';

  estates: any;
  cities: any;
  avatar: any;
  formEdit = false;

  user = new User();

  constructor(
    private service: UserService,
    private location: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
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
    if (id) {
      this.service.get(id).subscribe((data: any) => {
        this.user = data.data;
        this.getCities(this.user.endereco.cidade.estado_id);
      });
    } else {
      this.formEdit = true;
    }
  }

  getCities(estate_id) {
    this.spinner.show();
    this.location.getCities(estate_id).subscribe((data: any) => {
      this.cities = data;

      console.log(this.cities);
    });

    this.spinner.hide();
  }

  save() {
    this.spinner.show();

    this.user.enderecos[0] = this.user.endereco;

    this.service.store(this.user, this.avatar).subscribe((response: any) => {
      if (response.status === 200) {
        this.notify.sucess(msg.S001);
        if (response.body.id) {
          this.router.navigate(['/user/' + response.body.id]);
        }
      }

      this.spinner.hide();
    });
  }

  fileEvent(event) {
    if (event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
    }
  }

  deleteAvatar() {
    this.user.avatar = '/assets/img/theme/profile2.png';
  }

  deleteUser() {
    this.spinner.show();
    this.service.delete(this.user.id).subscribe((response: any) => {
      this.notify.sucess(msg.S002);
      this.router.navigate(['/users']);
      this.spinner.hide();
    });
  }

  editUser() {
    this.formEdit = true;
  }
}
