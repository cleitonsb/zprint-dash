import { EmitterService } from './../../services/emitter.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { EventManager } from '@angular/platform-browser';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    route: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/front/sales', title: 'Vendas',  icon: 'fa-shopping-cart text-black', class: '', route: '/venda' },
  { path: '/users', title: 'Usuários',  icon: 'fa-user-friends text-green', class: '', route: '/usuario' },
  { path: '/roles', title: 'Perfis',  icon: 'fa-key text-red', class: '', route: '/perfil' },
  { path: '/products', title: 'Produtos',  icon: 'fa-boxes text-black', class: '', route: '/produto' },
  { path: '/front/services', title: 'Serviços',  icon: 'fa-concierge-bell text-yellow', class: '', route: '/servico' },
  { path: '/front/cashiers', title: 'Caixa',  icon: 'fa-cash-register text-blue', class: '', route: '/caixa' },
  { path: '/purchases', title: 'Compras',  icon: 'fa-shopping-basket text-grey', class: '', route: '/compra' },
  { path: '/payments', title: 'Contas',  icon: 'fa-dollar-sign text-red', class: '', route: '/conta' },
  { path: '/people', title: 'Pessoas',  icon: 'fa-users text-green', class: '', route: '/pessoa' },
  { path: '/clocks', title: 'Ponto',  icon: 'fa-clock text-black', class: '', route: '/ponto' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  isCollapsed = true;
  version = '0.12';

  constructor(private router: Router, private service: UserService, private emitterService: EmitterService ) { }

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

        this.emitterService.msgEmitter.emit('userCarregado');
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
