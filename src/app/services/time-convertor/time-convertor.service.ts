import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeConverterService {

  constructor() { }

  convertTimeToUnix(date: number, split: number){
    let time = (+split[0]) * 3600 + (+split[1]) * 60;
    return date + time * 1000;
  }

  convertUnixToDate(unix: number){
    let date = new Date(unix);
    date.setHours(0);
    date.setMinutes(0);
    return date;
  }

  convertUnixToHours(unix: number){
    let date = new Date(unix);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

}
