import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  protected baseGet<T>(endpoint: string) {
    return this.configService.get('apiUrl').pipe(
      switchMap(
        (apiUrl: string) => this.httpClient.get<T>(`${apiUrl}/${this.sanitizeEndpoint(endpoint)}`,
        ).pipe(take(1))
      )
    );
  }

  protected basePost<T>(endpoint: string, data: any): Observable<T> {
    return this.configService.get('apiUrl').pipe(
      switchMap(
        (apiUrl: string) =>
          this.httpClient.post<T>(`${apiUrl}/${this.sanitizeEndpoint(endpoint)}`,
            data
          ).pipe(take(1))
      )
    );
  }

  private sanitizeEndpoint(endpoint: string): string {
    return endpoint.trim().replace(/^\//, '');
  }

}
