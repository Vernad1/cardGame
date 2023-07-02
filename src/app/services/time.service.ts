import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  interval: any
  time: number = 0

  formattedTime$: BehaviorSubject<string> = new BehaviorSubject<string>("00:00")

  constructor(private datePipe: DatePipe) {
  }

  startCounting() {
    this.time = 0;
    this.formattedTime$.next("00:00")
    this.interval = setInterval(() => {
      this.time++
      this.formattedTime$.next(<string>this.datePipe.transform(new Date(this.time * 1000), 'mm:ss'));
    }, 1000)
  }

  clearTimeInterval() {
    clearInterval(this.interval)
  }


}
