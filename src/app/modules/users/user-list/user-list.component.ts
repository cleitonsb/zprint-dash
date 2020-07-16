import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatorComponent} from "../../../components/paginator/paginator.component";
import {UserService} from "../../../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  titulo: string = 'Usuários';
  subTitulo: string = '';
  urlBreadcrumb: string = 'users'

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;
  paramBusca: string = '';

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page : number = 1){

    let param = (this.paramBusca) ? '/' + this.paramBusca: '';

    this.spinner.show();
    this.userService.getAll(param, page).pipe(first()).subscribe((users : any) => {
      this.users = users.data;
      this.paginator.getPaginator(users.meta);
      this.spinner.hide();
    })
  }
}
