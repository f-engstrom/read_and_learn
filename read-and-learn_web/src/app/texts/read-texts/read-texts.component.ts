import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextsService} from "../texts.service";
import {Text} from "../../shared/models/text";
import {ActivatedRoute} from "@angular/router";
import {WordsComponent} from "../../words/words/words.component";
import {WordService} from "../../words/word.service";
import {Word} from "../../shared/models/word";

@Component({
  selector: 'app-read-texts',
  templateUrl: './read-texts.component.html',
  styleUrls: ['./read-texts.component.css']
})
export class ReadTextsComponent implements OnInit, OnDestroy {


  text!: Text;
  words!: string[][];
  parahraphps: string[] = [];
  unkownWords: number = 0;
  pangeNr: number = 0;
  pages: Page[] = [];
  currentPage: Page = this.pages[this.pangeNr];

  constructor(private wordService: WordService, private textService: TextsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.wordService.getWords().subscribe();

    this.activatedRoute.params.subscribe(params => {

      this.text = this.textService.getText(params['textid']) as Text;

      this.unkownWords = this.text.unKnownWords as number;

      this.pages = this.createPages(this.text.body);
      this.currentPage = this.pages[this.pangeNr];

      console.log("pages", this.pages);

    })


    this.wordService.updatedWord.subscribe(() => {

      console.log("add word ");
      this.unkownWords = this.wordService.countUnknownWords(this.text.body);

    })


  }


  createPages(textBody: string) {

    let allWords = textBody.split(" ");
    let nrPages = allWords.length / 330;

    let startIndex = 0;
    let endIndex = 330;
    let pages: Page[] = [];

    let page: Page = new Page([]);


    let paragraphs = textBody.split(/\n/);

    let pageLength = 0;

    for (let paragraph of paragraphs) {

      let paragraphLength = paragraph.split(" ").length;

      if (paragraphLength + pageLength <= 330) {


        let paragraphWords = paragraph.split(" ");

        page.paragraphs.push(paragraphWords);

        pageLength += paragraphLength;

      } else {

        pages.push(page);
        page = new Page([]);
        pageLength = 0;

        let paragraphWords = paragraph.split(" ");

        page.paragraphs.push(paragraphWords);

        pageLength += paragraphLength;

      }

    }

    // let wordsForPage = allWords.slice(0, 330);
    //
    // console.log("words for page", wordsForPage);
    // //let paragraphs = wordsForPage.toString().split(/\n/);
    // console.log("paragraphs", paragraphs);
    //
    // paragraphs.forEach(paragraph => {
    //
    //   let paragraphWords = paragraph.split(" ");
    //
    //   page.paragraphs.push(paragraphWords);
    //
    // })

    // let wordsForParagraph = paragraphs.map(paragraph => {
    //
    //     return paragraph.split(" ");
    //
    //
    //   }
    // )

    pages.push(page);

    return pages;

  }


  ngOnDestroy() {

    if (this.unkownWords !== this.text.unKnownWords) this.textService.updateText(new Text(this.text.id, this.text.name, this.text.body, this.text.nrOfWords, this.unkownWords))
  }


  onPageDown() {

    if (this.pangeNr > 0) {
      this.pangeNr--;

      this.currentPage = this.pages[this.pangeNr];

    }

  }

  onPageUp() {

    if (this.pangeNr + 1 <= this.pages.length) {

      this.pangeNr++;
      this.currentPage = this.pages[this.pangeNr];

    }
  }
}

// interface Page {
//
//   paragraphs: [
//     words: string[]
//   ]
//
//
// }

class Page {
  constructor(public paragraphs: string[][]) {
  }

}

