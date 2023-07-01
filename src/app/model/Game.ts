import {ICard} from "./card";
import {BehaviorSubject, Observable} from "rxjs";
import {TimeService} from "../services/time.service";
import {CountService} from "../services/count.service";


export class Game {

  cards: ICard[] = [];
  selectedCards: (ICard | undefined)[] = [];
  isStep: Boolean = false;

  cardsSubject: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>([])
  cardsSubject$: Observable<ICard[]> = this.cardsSubject.asObservable()

  win: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  win$: Observable<boolean> = this.win.asObservable()

  constructor() {
    this.selectedCards = [];
    this.cards = this.createCards()
    this.setCardsSubject(this.cards)
    this.cards = this.shuffleCards(this.cards)
    this.win.next(false)
  }

  createCards() {
    let res = [];
    for (let i = 0; i < 36; i++) {
      let card: ICard = {
        id: i + 1,
        value: Math.round((i + 1) / 2),
        clicked: false,
        matched: false
      };
      res.push(card);
    }
    return res;
  }

  shuffleCards(cards: ICard[]) {
    return cards.sort(() => Math.random() - 0.5);
  }


  setCardsSubject(cards: ICard[]) {
    this.cardsSubject.next(cards)
  }

  isWin() {
    if (!this.cards.find(card => card.matched === false)) {
      this.win.next(true)
      //this.timeService.clearTimeInterval()
    }
  }

  handleClick(id: number, value: number) {
    this.isStep = false;

    if (
      this.selectedCards.length === 2 ||
      this.selectedCards.find((card) => card?.id === id)
    ) {
      return;
    }

    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id === id) {
        this.cards[i].clicked = true
      }
    }

    if (this.selectedCards.length === 1 && this.selectedCards[0]) {

      //this.countService.step()

      const card1: ICard = this.selectedCards[0];
      const card2: ICard | undefined = this.cards.find(
        (card: ICard): boolean => card.id === id
      );

      if (card1.value == card2?.value) {
        setTimeout(() => {

          for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].value === card1.value) {
              this.cards[i].matched = true
            }
          }

          this.isWin()
          this.setCardsSubject(this.cards)

        }, 500)
        this.selectedCards = [];
      } else {
        this.selectedCards = [card1, card2];
        setTimeout(() => {

          for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id === card1?.id || this.cards[i].id === card2?.id) {
              this.cards[i].clicked = false
            }
          }

          this.selectedCards = [];
          this.setCardsSubject(this.cards)

        }, 1500);
      }
      this.isStep = true;

    } else {
      this.selectedCards = [...this.selectedCards, {id, value, clicked: false, matched: false}];
      this.isStep = false;
    }
    this.setCardsSubject(this.cards)
  }

}
