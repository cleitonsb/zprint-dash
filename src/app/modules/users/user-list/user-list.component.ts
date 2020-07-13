import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user";
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
  users: User[];
  titulo: string = 'Usuários';
  urlBreadcrumb: string = 'users'

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros(page : number = 1){
    this.spinner.show();
    this.userService.getAll(page).pipe(first()).subscribe((users : any) => {
      this.users = users.data;
      this.paginator.getPaginator(users.meta);
      this.spinner.hide();
    })
  }
}
