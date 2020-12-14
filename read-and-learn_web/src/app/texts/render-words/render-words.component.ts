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
    // this.skipChar = this.skipChars.includes(this.word);


    if (this.wordService.findWord(this.inputWord)){

      this.isKnown = true;
      this.word = this.wordService.findWord(this.inputWord);


    }else{
      let word = this.inputWord.replace(/[[0-9.,«»;]+/g, "");

      this.word = new Word(word)

    }





  }

  onAddOrUpdate() {

    this.wordService.chosenWord.next(this.word);

  }


}
