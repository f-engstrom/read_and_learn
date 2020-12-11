import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {TextsService} from "../texts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css']
})
export class AddTextComponent implements OnInit {

  constructor(private textsService: TextsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(addTextForm: NgForm) {

    console.log("add text", addTextForm.value.textName);

    this.textsService.addText({textName: addTextForm.value.textName, textBody: addTextForm.value.text})

    this.router.navigate(["/texts"]);

  }
}
