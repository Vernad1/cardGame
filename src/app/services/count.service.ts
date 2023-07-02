import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountService {
  count$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor() {
  }

  step() {
    this.count$.next(this.count$.value + 1)
  }

  resetCount() {
    this.count$.next(0)
  }
}
