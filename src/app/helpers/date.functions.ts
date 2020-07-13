import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFunctions{
  constructor() { }

  formatByString(data: string = null){
    if(data == null) return;
    if(data.length >= 10) return data;

    return data.substr(0,2) + '/' + data.substr(2,2) + '/' + data.substr(4,4)
  }
}
