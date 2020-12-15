import {Component, OnInit} from '@angular/core';
import {TextsService} from "../texts.service";
import {Text} from "../../shared/models/text";
import {ActivatedRoute} from "@angular/router";
import {WordsComponent} from "../../words/words/words.component";
import {WordService} from "../../words/word.service";

@Component({
  selector: 'app-read-texts',
  templateUrl: './read-texts.component.html',
  styleUrls: ['./read-texts.component.css']
})
export class ReadTextsComponent implements OnInit {


  text!: Text;
  words!:string[][];
  parahraphps:string[]=[];

  constructor(private wordService:WordService,private textService: TextsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.wordService.getWords().subscribe();

    this.activatedRoute.params.subscribe(params => {

      console.log("par", params);
        this.text= this.textService.getText(params['textid']) as Text;

        this.parahraphps = this.text.body.split(/\n/);

        console.log("paragraphs",this.parahraphps);


        this.words = this.parahraphps.map(paragraph =>{

          return paragraph.split(" ");


          }

        )

    })

  }

}
