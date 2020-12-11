import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextsService} from "../texts.service";
import {map} from "rxjs/operators";
import {Text} from "../../shared/models/text";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-texts-list',
  templateUrl: './texts-list.component.html',
  styleUrls: ['./texts-list.component.css']
})
export class TextsListComponent implements OnInit, OnDestroy {

  constructor(private textsService: TextsService) {
  }

  texts: Text[] = [];
  textSub!: Subscription;

  ngOnInit() {

    this.textSub = this.textsService.getTexts().subscribe(texts => this.texts = texts);
  }

  ngOnDestroy() {
    this.textSub.unsubscribe();
  }


}
