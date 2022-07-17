import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import { UserService } from './user.service';
import {BaseService} from './base.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  private user: any;
  private email: string;
  private senha: string;


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, senha: string) {
    this.email = email;
    this.senha = senha;

    return this.basePost<any>(`login`, JSON.stringify({email, senha}))
      .pipe(map(token => {

        this.user = {
          token: token.Authorization,
          email: email
        };

        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.currentUserSubject.next(this.user);
        return this.user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getEmail() {
    return this.email;
  }

  public getUser() {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }
}
