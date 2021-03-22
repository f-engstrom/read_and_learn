import {Component, Input, OnInit} from '@angular/core';
import {WordService} from "../../words/word.service";
import {Word} from "../../shared/models/word";

@Component({
  selector: 'app-render-words',
  templateUrl: './render-words.component.html',
  styleUrls: ['./render-words.component.css']
})
export class RenderWordsComponent implements OnInit {

  @Input() inputData!:
    {
      paragraphIndex: number,
      wordIndex: number,
      word: string,
      compoundWordList: { paragraphIndex: number, wordIndex: number, compoundWord: string, isLastWord: boolean }[]
    };
  isKnown: boolean = false;
  skipChar: boolean = false;
  word!: Word | undefined;
  partOfCompoundWord: boolean = false;
  isLastWord: { paragraphIndex: number, wordIndex: number, compoundWord: string, isLastWord: boolean }[] = [];


  skipChars = [',', '.', '-', '—', '«', '»'];

  constructor(private wordService: WordService) {
  }

  ngOnInit(): void {

    let word = this.inputData.word.replace(/[[0-9.,«»;!?]+/g, "").toLowerCase();

    if (this.wordService.findWord(word)) {

      this.isKnown = true;
      this.word = this.wordService.findWord(word);


    } else {

      this.word = new Word(word)

    }

    //  console.log("word" + this.inputData.word + " paragraphIndex " + this.inputData.paragraphIndex + " wordIndex " + this.inputData.wordIndex);
    // console.log("compoundwords ", this.inputData.compoundWordList)
    let matches = this.inputData.compoundWordList.filter(matches => {

      //   console.log("matchdata", matches.paragraphIndex);
      return matches.paragraphIndex === this.inputData.paragraphIndex && matches.wordIndex === this.inputData.wordIndex;

    })

    if (matches.length > 0) {

      //   console.log("match")
      this.partOfCompoundWord = true;
      this.isLastWord = matches.filter(match => {
        return match.isLastWord
      })

    }


    this.wordService.updatedWord.subscribe(updatedWord => {

      if (updatedWord.word === this.word?.word) {

        this.isKnown = true;
        this.word = this.wordService.findWord(this.inputData.word);


      }

      if (updatedWord.isCompoundWord) {


      }


    })


  }

  onAddOrUpdate($event: MouseEvent) {

    console.log(this.word)
    $event.altKey ? this.wordService.chosenWord.next({
      word: new Word(this.word?.word as string,this.word?.id as string,this.word?.translations,this.word?.tags,this.word?.isCompoundWord),
      isPartOfCompoundWord: true
    }) : this.wordService.chosenWord.next({
      word: new Word(this.word?.word as string, this.word?.id as string, this.word?.translations, this.word?.tags, this.word?.isCompoundWord),
      isPartOfCompoundWord: false
    });

  }


  onCompoundWordClick(compoundWord: string) {


    this.wordService.chosenWord.next({
      word: new Word(compoundWord),
      isPartOfCompoundWord: false
    })

  }
}
