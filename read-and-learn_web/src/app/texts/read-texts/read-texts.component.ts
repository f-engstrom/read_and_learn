import {Component, OnInit} from '@angular/core';
import {TextsService} from "../texts.service";
import {Text} from "../../shared/models/text";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-read-texts',
  templateUrl: './read-texts.component.html',
  styleUrls: ['./read-texts.component.css']
})
export class ReadTextsComponent implements OnInit {


  text!: Text;

  constructor(private textService: TextsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      console.log("par", params);
        this.text= this.textService.getText(params['textid']) as Text;

    })

  }

}
