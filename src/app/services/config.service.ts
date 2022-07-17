import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {CONFIG_ENV_JSON_PATH} from '../constants/config.constants';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /**
   * Chave para ser usada como
   * identificaçõe da app rodando
   */
  appKey: string;

  /**
   * Cache das configurações
   */
  private cache: Map<string, any> = new Map();

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Registra nas configurações para fins de cache
   * qual aplicação em questão
   * @param name Nome da aplicação
   * @param version Versão da aplicação
   */
  registerApp(name: string, version: string): void {
    console.log('%cRegistrando aplicação: %s (%s)', 'color: #fafafa; background: #424242', name, version);
    this.appKey = `app:${name}|version:${version}`;
  }

  getAll(): Observable<any> {
    if (this.cache.has(this.appKey)) {
      return of(this.cache.get(this.appKey));
    } else {
      return this.httpClient.get<any>(CONFIG_ENV_JSON_PATH).pipe(
        take(1),
        tap((config: any) => this.cache.set(this.appKey, config)),
      );
    }
  }

  /**
   * Retorna um `Observable`. Se assinado vai
   * trazer a configuração selecionada
   * @param property Propriedade da configuração a ser retornada no `Observable`
   */
  get(property: string): Observable<any> {
    return this.getAll().pipe(
      map((config: any) => config[property] as any)
    ).pipe(take(1));
  }

  /**
   * Retorna um `Observable`. Se assinado vai
   * trazer as configurações selecionadas
   * em uma lista
   * @param properties Lista de propriedades da configuração a serem retornadas no `Observable`
   */
  getList(properties: string[]): Observable<any[]> {
    return forkJoin(
      properties.map((property: string) => this.get(property))
    ).pipe(take(1));
  }

}
