import { Component, OnInit } from '@angular/core';
import {TextsService} from "../texts.service";

@Component({
  selector: 'app-texts-list',
  templateUrl: './texts-list.component.html',
  styleUrls: ['./texts-list.component.css']
})
export class TextsListComponent implements OnInit {

  constructor(private textsService:TextsService) { }

  ngOnInit(): void {
  }

}
