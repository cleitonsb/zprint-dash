import { Component, OnInit } from '@angular/core';
import {Role} from "../../../models/role";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";
import {RoleService} from "../../../services/role.service";
import {Permission} from "../../../models/permission";
import {msg} from "../../../variables/msg";
import {Observable} from "rxjs";

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  titulo: string = 'Perfis';
  subTitulo: string = 'Cadastro';
  urlBreadcrumb: string = 'roles';
  formEdit: boolean = false;
  role = new Role();
  permissions = Array<Permission>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: NotificationService,
    private spinner: NgxSpinnerService,
    private service: RoleService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => this.view(params.id));
  }

  save() {
    this.getPermissions();

    this.service.store(this.role).subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.msg.sucess(msg.S001);
        if (response.body.id) {
          this.router.navigate(['/role/' + response.body.id]);
          this.formEdit = false;
        }
      }

      this.spinner.hide();
    });
  }

  editItem() {
    this.formEdit = true;
  }

  private view(id: any) {

    this.service.getPermissions().subscribe((data: any) => {
      this.permissions = data;
      if(id) {
        this.service.get(id).subscribe((data: any) => {
          this.role = data.data;

          this.setPermissions();
          this.spinner.hide();
        });
      }else{
        this.formEdit = true;
        this.spinner.hide();
      }
    });
  }

  private getPermissions(){
    this.role.permissoes = [];

    this.permissions.forEach(val => {
      if(val.sit !== undefined && val.sit == true) {
        this.role.permissoes.push(Object.assign({}, val))
      }
    });
  }

  private setPermissions(){
    for(let roleVal of this.role.permissoes) {
      for(let i in this.permissions) {
        if(roleVal.id == this.permissions[i].id) {
          this.permissions[i].sit = true;
        }
      }
    }
  }
}
