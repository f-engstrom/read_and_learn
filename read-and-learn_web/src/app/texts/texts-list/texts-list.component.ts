import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextsService} from "../texts.service";
import {map} from "rxjs/operators";
import {Text} from "../../shared/models/text";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-texts-list',
  templateUrl: './texts-list.component.html',
  styleUrls: ['./texts-list.component.css']
})
export class TextsListComponent implements OnInit, OnDestroy {

  constructor(private textsService: TextsService,private router:Router,private route:ActivatedRoute) {
  }

  texts: Text[] = [];
  textSub!: Subscription;
  textChangedSub!:Subscription;

  ngOnInit() {

    this.textSub = this.textsService.getTexts().subscribe(texts => this.texts = texts);
    this.textChangedSub = this.textsService.textSub.subscribe(texts => this.texts = texts);

  }

  ngOnDestroy() {
    this.textSub.unsubscribe();
  }


  onDelete(id: string) {

    this.textsService.deleteText(id);

  }

  onEdit(text: Text) {

    this.router.navigate(["edit",text.id,text.urlSlug],{relativeTo:this.route})


  }
}
