import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextsService} from "../texts.service";
import {Text} from "../../shared/models/text";
import {ActivatedRoute} from "@angular/router";
import {WordsComponent} from "../../words/words/words.component";
import {WordService} from "../../words/word.service";
import {Word} from "../../shared/models/word";

@Component({
  selector: 'app-read-texts',
  templateUrl: './read-texts.component.html',
  styleUrls: ['./read-texts.component.css']
})
export class ReadTextsComponent implements OnInit,OnDestroy {


  text!: Text;
  words!: string[][];
  parahraphps: string[] = [];
  unkownWords:number=0;

  constructor(private wordService: WordService, private textService: TextsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.wordService.getWords().subscribe();

    this.activatedRoute.params.subscribe(params => {

      this.text = this.textService.getText(params['textid']) as Text;

      this.unkownWords = this.text.unKnownWords as number;
      this.parahraphps = this.text.body.split(/\n/);


      this.words = this.parahraphps.map(paragraph => {

          return paragraph.split(" ");


        }
      )

    })


    this.wordService.updatedWord.subscribe(()=>{

      console.log("add word ");
      this.unkownWords = this.wordService.countUnknownWords(this.text.body);

    })


  }

  ngOnDestroy() {

    if (this.unkownWords !== this.text.unKnownWords) this.textService.updateText(new Text(this.text.id,this.text.name,this.text.body,this.text.nrOfWords,this.unkownWords))
  }


}
