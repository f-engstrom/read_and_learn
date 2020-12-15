import {Injectable} from '@angular/core';
import {of, Subject} from "rxjs";
import {Word} from "../shared/models/word";
import {map, tap} from "rxjs/operators";
import {Text} from "../shared/models/text";
import {HttpClient} from "@angular/common/http";


interface WordResponse {

  documents: [{
    name: string,
    fields: {
      tags: {
        arrayValue: {

          values: [
            {
              stringValue: string
            }
          ]
        }
      },
      translations: {
        arrayValue: {

          values: [
            {
              stringValue: string
            }
          ]
        }
      },
      word: {
        stringValue: string
      }
    },
    createTime: string,
    updateTime: string,
  }]

}

@Injectable({
  providedIn: 'root'
})
export class WordService {

  chosenWord = new Subject<Word>();
  updatedWord = new Subject<Word>();

  words: Word[] = [];

  //[new Word("набережной", "", ["embankment", "waterfront"], []), new Word("появилось", "", ["någotryskt"], [])]


  constructor(private http: HttpClient) {
  }

  findWord(searchWord: string) {

    return this.words.find(word => {
      return word.word.toLowerCase() === searchWord.toLowerCase();
    })

  }

  addWord(word: Word) {

    this.words.push(word);
    this.updatedWord.next(word);

  }

  getWords() {


    if (this.words.length > 0) {

      return of(this.words);
    } else {


      return this.fetchWords();

    }
  }


  private fetchWords() {

    return this.http.get<WordResponse>("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/words/").pipe(map(wordRe => {

      return wordRe.documents.map((word) => {
        let arr = word.name.split("/");
        let id = arr[arr.length - 1];
        let translations = word.fields.translations.arrayValue.values.map(stringObj => stringObj.stringValue);
        let tags = word.fields.tags.arrayValue.values.map(stringObj => stringObj.stringValue);


        return new Word(word.fields.word.stringValue, id, translations, tags);
      })


    }), tap(words => this.words = words));


  }
}
