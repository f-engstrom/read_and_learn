import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Text} from "../shared/models/text";
import {map, tap} from "rxjs/operators";
import {of} from "rxjs";


interface TextResponse {

  documents: [{
    name: string,
    fields: {
      textBody: {
        stringValue: string
      }, name: {
        stringValue: string
      }, nrWords: {
        integerValue: string
      }
    },
    createTime: string,
    updateTime: string,
  }]

}

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  constructor(private http: HttpClient) {
  }

  texts:Text[]=[];


  addText(text: { textName: string; textBody: string }) {


    const nrWords= text.textBody.split(" ").length;

    const body = {
      fields:
        {
          textBody: {
            stringValue: text.textBody
          },
          name:
            {
              stringValue: text.textName
            },
          nrWords: {
            integerValue: nrWords
          }
        }
    }


    console.log("text", text);
    this.http.post("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/texts/", body).subscribe(res => {
        console.log("res", res);
      }
    )


  }

  getTexts(){

    if (this.texts.length >0){

      return of(this.texts);
    }else{


      return this.fetchTexts();

    }

  }

  private fetchTexts() {

    return  this.http.get<TextResponse>("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/texts/").pipe(map(textRe => {

      return textRe.documents.map((text) => {
        let arr = text.name.split("/");
        let id = arr[arr.length-1];
        return new Text(id, text.fields.name.stringValue, text.fields.textBody.stringValue, +text.fields.nrWords.integerValue);
      })


    }),tap(texts => this.texts =texts));


  }


  getText(id:string){

    return this.texts.find(text=>{

      return text.id === id;

    })

  }

}
