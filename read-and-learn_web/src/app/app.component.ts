import {Component, OnDestroy, OnInit} from '@angular/core';
import {WordService} from "./words/word.service";
import {TextsService} from "./texts/texts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'read-and-learn';
  wordSub!: Subscription;
  textSub!: Subscription;

  constructor(private wordService: WordService, private textService: TextsService) {
  }

  ngOnInit(): void {

    this.wordSub = this.wordService.getWords().subscribe();
    this.textSub = this.textService.getTexts().subscribe();

  }

  ngOnDestroy() {
    this.wordSub.unsubscribe();
    this.textSub.unsubscribe();
  }


}
