import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Word} from "../shared/models/word";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  chosenWord = new Subject<Word>();

  words:Word[]=[new Word("набережной","",["embankment"],[]), new Word("появилось", "", ["någotryskt"], [])]


  constructor() { }

  findWord(searchWord:string){

   return this.words.find(word=>{
      return word.word.toLowerCase() === searchWord.toLowerCase();
    })

  }
}
