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
  word: Word | null = null;
  isKnown: boolean = false;
  isCompoundWord = false;

  constructor(private wordService: WordService) {
  }

  ngOnInit(): void {

    this.wordService.chosenWord.subscribe(word => {


        if (!word.isPartOfCompoundWord) {

          this.isKnown = false;
          if (word) {
            this.word = word.word;
          }
          if (this.wordService.findWord(word.word.word)) this.isKnown = true;

          this.isCompoundWord = this.word?.isCompoundWord as boolean;

        } else {

          if (!this.word) {
            console.log("no word")
            this.word = word.word;

          } else {
            console.log("word exists")
            this.word.word += " " + word.word.word;

          }
          this.word.word = this.word.word.trim();
          this.isCompoundWord = true;
        }


      }
    );

  }

  onClose() {

    this.word = null;

  }

  onSubmit(wordForm: NgForm) {

//    console.log("submit", wordForm.value);
    let translations = wordForm.value.translations.split(",") as string[];
    let tags: string[] = [];
    if (wordForm.value.tags) tags = wordForm.value.tags.split(",") as string[];

    // @ts-ignore
    const word = new Word(this.word.word, "", translations, tags, this.isCompoundWord);

    this.wordService.addWord(word);

    this.onClose();

  }
}
