import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {TextsService} from "../texts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Text} from "../../shared/models/text";

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css']
})
export class AddTextComponent implements OnInit {

  constructor(private textsService: TextsService, private router: Router, private route: ActivatedRoute) {
  }

  text!: Text | undefined;
  editMode: boolean = false;

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['textid']) {
        console.log("editmode");
        this.editMode = true;
        this.text = this.textsService.getText(params['textid'])

      }


    })

  }

  onSubmit(addTextForm: NgForm) {

    console.log("add text", addTextForm.value.textName);

    if (!this.editMode) {
      this.textsService.addText({textName: addTextForm.value.textName, textBody: addTextForm.value.text})

    } else {

      this.textsService.updateText(new Text(this.text?.id as string, addTextForm.value.textName, addTextForm.value.text, this.text?.nrOfWords as number, this.text?.unKnownWords))
    }


    this.router.navigate(["/texts"]);

  }

  onCancel() {

    this.router.navigate(["/texts"])
  }
}
