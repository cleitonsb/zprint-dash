import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private user: any;
  private email: string;
  private senha: string;

  constructor(private http: HttpClient, private service: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  public login(email: string, senha: string) {
    this.email = email;
    this.senha = senha;

    return this.http.post<any>(`${environment.apiUrl}/login`, JSON.stringify({email, senha}))
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
}
