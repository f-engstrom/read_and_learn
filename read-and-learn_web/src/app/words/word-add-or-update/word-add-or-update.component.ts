import { Component, OnInit } from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../../shared/models/word";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-word-add-or-update',
  templateUrl: './word-add-or-update.component.html',
  styleUrls: ['./word-add-or-update.component.css']
})
export class WordAddOrUpdateComponent implements OnInit {
  word!: Word;
  isKnown: boolean = false;

  constructor(private wordService:WordService) { }

  ngOnInit(): void {

    this.wordService.chosenWord.subscribe(word=> {

      this.isKnown=false;
      if (word) this.word = word;

      if (this.wordService.findWord(word.word)) this.isKnown =true;

      }
    );

  }

  onSubmit(wordForm: NgForm) {

    console.log("submit",wordForm);
    this.wordService.addWord(this.word);

  }
}
