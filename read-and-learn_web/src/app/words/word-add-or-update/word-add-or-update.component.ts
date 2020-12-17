import {Component, OnInit} from '@angular/core';
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

  constructor(private wordService: WordService) {
  }

  ngOnInit(): void {

    this.wordService.chosenWord.subscribe(word => {

      console.log("clicked word", word);

      this.isKnown = false;
        if (word) {
          this.word = word;
        }
        if (this.wordService.findWord(word.word)) this.isKnown = true;

      }
    );

  }

  onSubmit(wordForm: NgForm) {

    console.log("submit", wordForm.value);
    let translations = wordForm.value.translations.split(",") as string[];
    let tags: string[] =[];
    if (wordForm.value.tags) tags = wordForm.value.tags.split(",") as string[];


    const word = new Word(this.word.word, "", translations, tags)
    this.wordService.addWord(word);

  }
}
