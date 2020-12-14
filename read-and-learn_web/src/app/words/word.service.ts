import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Word} from "../shared/models/word";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  chosenWord = new Subject<Word>();
  updatedWord = new Subject<Word>();

  words:Word[]=[new Word("набережной","",["embankment", "waterfront"],[]), new Word("появилось", "", ["någotryskt"], [])]


  constructor() { }

  findWord(searchWord:string){

   return this.words.find(word=>{
      return word.word.toLowerCase() === searchWord.toLowerCase();
    })

  }

  addWord(word: Word) {

    this.words.push(word);
    this.updatedWord.next(word);

  }
}
