import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    route: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/users', title: 'Usuários',  icon: 'ni-single-02 text-green', class: '', route: '/usuario' },
  { path: '/roles', title: 'Perfis',  icon: 'ni-bullet-list-67 text-red', class: '', route: '/perfil' },
  { path: '/products', title: 'Produtos',  icon: 'ni-key-25 text-black', class: '', route: '/produto' },
  { path: '/front/sale-list', title: 'Vendas',  icon: 'ni-key-25 text-black', class: '', route: '/venda' },
  { path: '/front/service-list', title: 'Serviços',  icon: 'ni-tv-2 text-primary', class: '', route: '/servico' },
  { path: '/front/cashier', title: 'Caixa',  icon: 'ni-key-25 text-black', class: '', route: '/caixa' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  isCollapsed = true;
  version = '0.1';

  constructor(private router: Router, private authenticationService: AuthenticationService, private service: UserService ) { }

  ngOnInit() {
    this.getCurrentUser();

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  private getCurrentUser() {

    let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser.user === undefined) {

      this.service.getByEmail(currentUser.email).subscribe((data: any) => {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const user = {
          user: data,
          token: currentUser.token
        };

        localStorage.setItem('currentUser', JSON.stringify(user));

        this.menuItems = ROUTES.filter(this.getRoutes);
      });
    } else  {
      this.menuItems = ROUTES.filter(this.getRoutes);
    }
  }

  getRoutes( route ) {

    const user: any = JSON.parse(localStorage.getItem('currentUser'));

    for (const val of user.user.perfil.permissoes) {
      if (val.rota === route.route) {
        return true;
      }
    }
  }

}
