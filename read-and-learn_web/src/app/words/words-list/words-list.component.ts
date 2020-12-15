import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../../shared/models/word";

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  words: Word[] = [];

  constructor(private wordService: WordService) {
  }

  ngOnInit(): void {


    this.wordService.getWords().subscribe((words: Word[]) => {

      console.log("woooords", words);

      if (words) this.words = words;

    })

  }

}
