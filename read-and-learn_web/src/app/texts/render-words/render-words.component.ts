import {Component, Input, OnInit} from '@angular/core';
import {WordService} from "../../words/word.service";
import {Word} from "../../shared/models/word";

@Component({
  selector: 'app-render-words',
  templateUrl: './render-words.component.html',
  styleUrls: ['./render-words.component.css']
})
export class RenderWordsComponent implements OnInit {

  @Input() inputWord!: string;
  isKnown: boolean = false;
  skipChar: boolean = false;
  word!: Word | undefined;


  skipChars = [',', '.', '-', '—', '«', '»']

  constructor(private wordService: WordService) {
  }

  ngOnInit(): void {

    let word = this.inputWord.replace(/[[0-9.,«»;!?]+/g, "").toLowerCase();

    if (this.wordService.findWord(word)) {

      this.isKnown = true;
      this.word = this.wordService.findWord(word);


    } else {

      this.word = new Word(word)

    }

    this.wordService.updatedWord.subscribe(updatedWord => {

      if (updatedWord.word === this.word?.word){

          this.isKnown = true;
          this.word = this.wordService.findWord(this.inputWord);


        }





    })


  }

  onAddOrUpdate() {

    this.wordService.chosenWord.next(this.word);

  }


}
