import { Component, OnInit } from '@angular/core';
import {Word} from "../../shared/models/word";

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.css']
})
export class WordEditComponent implements OnInit {

  constructor() { }

  word!:Word;

  ngOnInit(): void {
  }

}
