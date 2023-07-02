import {Injectable} from '@angular/core';
import {ICard} from "../model/card";
import {Game} from "../model/Game";
import {TimeService} from "./time.service";
import {CountService} from "./count.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  //cards: ICard[] = [];
  cards:BehaviorSubject<ICard[]>
  win: boolean = false
  game!: Game


  constructor(private timeService: TimeService, private countService: CountService) {
    this.game = new Game(36)
    this.cards = this.game.cards$
  }

  newGame(numberOfCards:number) {
    this.game = new Game(numberOfCards)
    this.countService.resetCount()
    this.cards = this.game.cards$
    //this.game.cards$.subscribe(value => this.cards = value)
    //this.cards = this.game.cards

    this.game.win$.subscribe(value => {
      this.win = value
      if(value) {
        this.timeService.clearTimeInterval()
      }
    })
  }

  cardClick(id: number, value: number) {
    this.game.handleClick(id, value);
    if(this.game.isStep) {
      this.countService.step()
    }
  }

}
