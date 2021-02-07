import { RoleService } from './../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../services/location.service';
import { NotificationService } from '../../../services/notification.service';
import { User } from '../../../models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { msg } from '../../../variables/msg';
import { Endereco } from 'src/app/models/endereco';

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
  roles: any;

  user = new User();

  constructor(
    private service: UserService,
    private location: LocationService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => this.view(params.id));
    this.roleService.getAll().subscribe((rows : any) => {
      this.roles = rows;
    });

    this.location.getEstates().subscribe((data: any) => {
      this.estates = data;
      this.spinner.hide();
    });

    this.user.avatar = '/assets/img/theme/profile2.png';
  }

  view(id) {
    if (id) {
      this.service.get(id).subscribe((data: any) => {
        this.user = data;

        if (data.enderecos.length > 0){
          this.getCities(this.user.enderecos[0].cidade.estado.id);
        } else {
          this.user.enderecos[0] = new Endereco();
        }

        if(this.user.avatar === null) {
          this.user.avatar = '/assets/img/theme/profile2.png';
        }

      });
    } else {
      this.user.enderecos[0] = new Endereco();
      this.user.perfil.id = 0;
      this.formEdit = true;
    }
  }

  getCities(estate_id) {
    this.spinner.show();
    this.location.getCities(estate_id).subscribe((data: any) => {
      this.cities = data;
    });

    this.spinner.hide();
  }

  save() {
    this.spinner.show();

    if(!('id' in this.user.enderecos[0].cidade)) {
      delete this.user.enderecos;
    }

    delete this.user.password;

    this.service.store(this.user).subscribe((response: any) => {
      if (response.status === 200) {
        let userId = response.body.id;

        if (this.avatar != null) {
          this.service.upload(this.avatar, userId).subscribe((res: any) => {
            this.saveSuccess(userId);
          });
        } else {
          this.saveSuccess(userId);
        }
      }
    });
  }

  saveSuccess(id) {
    this.notify.sucess(msg.S001);
    if (id) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/user/' + id]);
      });
    }

    this.spinner.hide();
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
