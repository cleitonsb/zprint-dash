import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  msgEmitter = new EventEmitter<String>();

  constructor() { }


}
