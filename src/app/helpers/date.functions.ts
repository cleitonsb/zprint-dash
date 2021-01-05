import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFunctions{
  constructor() { }

  formatByString(data: string = null){
    if (data == null) { return; }
    if (data.length >= 10) { return data; }

    return data.substr(0, 2) + '/' + data.substr(2, 2) + '/' + data.substr(4, 4);
  }

  timestampToDate(timestamp: string = null) {
    if (timestamp == null) { return; }
    const result = new Date(timestamp);

    return result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear();
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  removeDays(date, days) {
    const arrData = date.split('/');
    date = arrData[1] + '/' + arrData[0] + '/' + arrData[2];

    const newDate = new Date(date);

    const result = new Date(date);
    result.setDate(newDate.getDate() - days);
    return result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear();
  }

  today() {
    const result = new Date();
    return result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear();
  }

  firstDay() {
    const result = new Date();
    return '01-' + (result.getMonth() + 1) + '-' + result.getFullYear();
  }
}
