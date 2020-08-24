import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginatorComponent} from '../../../components/paginator/paginator.component';
import {UserService} from '../../../services/user.service';
import {NgxSpinnerService} from "ngx-spinner";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  titulo = 'Usuários';
  subTitulo = '';
  urlBreadcrumb = 'users';
  total: Number;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;
  paramBusca = '';

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page: number = 1) {

    const param = (this.paramBusca) ? '/busca/' + this.paramBusca : '';

    this.spinner.show();
    this.userService.getAll(param, page).pipe(first()).subscribe((data: any) => {
      this.users = data.content;
      this.total = data.totalElements;
      this.spinner.hide();
    });
  }
}
