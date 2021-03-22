import {Injectable} from '@angular/core';
import {of, Subject} from "rxjs";
import {Word} from "../shared/models/word";
import {map, tap} from "rxjs/operators";
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
      },
      isCompoundWord: {
        booleanValue: boolean
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

  chosenWord = new Subject<{ word: Word, isPartOfCompoundWord: boolean }>();
  updatedWord = new Subject<Word>();

  words: Word[] = [];

  compoundWords: Word[] = [];

  //   [new Word("Она гуляла одна, всё"),
  //   new Word("Говорили, что на набережной"),
  //   new Word("уже дочь двенадцати"),
  //   new Word("саду и на сквере"),
  //   new Word("уже дочь двенадцати лет")
  // ];



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

    console.log("add word", word);

    let translations = word.translations?.map(trans => {
      return {
        stringValue: trans
      }
    });

    let tags = word.tags?.map(tags => {
      return {
        stringValue: tags
      }
    });

    const body = {
      fields: {
        isCompoundWord: {
          booleanValue: word.isCompoundWord
        },
        tags: {
          arrayValue: {

            values: tags
          }
        },
        translations: {
          arrayValue: {

            values: translations
          }
        },
        word: {
          stringValue: word.word
        }
      }
    }


    this.http.post("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/words/", body).subscribe(res => {
      //  console.log("res", res);
      }, error => {
        console.log("words error", error)
      }
    )

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
      console.log("fetch wiords", wordRe);

      return wordRe.documents.map((word) => {
        let arr = word.name.split("/");
        let id = arr[arr.length - 1];
        let translations = word.fields.translations.arrayValue.values.map(stringObj => stringObj.stringValue);
        let tags: string[] = [];
        if (word.fields.tags.arrayValue.values) {
          tags = word.fields.tags.arrayValue.values.map(stringObj => stringObj.stringValue);

        }
        let isCompoundWord = false;
        if (word.fields.isCompoundWord.booleanValue) isCompoundWord = word.fields.isCompoundWord.booleanValue;


        return new Word(word.fields.word.stringValue, id, translations, tags, isCompoundWord);
      })


    }), tap(words => {
      words.forEach(word => {

        if (word.isCompoundWord) {
          this.compoundWords.push(word);
        } else {
          this.words.push(word);
        }

      });
    }));


  }


  countUnknownWords(text: string) {


    const onlyText = text.replace(/[[0-9.,«»:;!?\n]+/g, "");
    const words = onlyText.split(" ");
    const unique = words.filter(this.onlyUnique);

    let unknownWords = 0;

    unique.map(textWord => {


      let foundWOrd = this.words.filter(word => {
        return word.word === textWord
      })

      if (foundWOrd.length === 0) {
        unknownWords++;
      }

    })

    return unknownWords;

  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }


}
