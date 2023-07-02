import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {GameService} from "../../services/game.service";
import {TimeService} from "../../services/time.service";
import {CountService} from "../../services/count.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe]
})
export class GameComponent {
  modalShow: boolean = true

  constructor(public gameService: GameService, public timeService:TimeService, public countService:CountService) {
  }

  startGame(numberOfCards:number) {
    this.gameService.newGame(numberOfCards)
    this.modalShow = false;
    this.timeService.startCounting()
  }

}
