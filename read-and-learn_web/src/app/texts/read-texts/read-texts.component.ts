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
  //wordsInCompoundWord: { paragraphIndex: number, wordIndex: number, compoundWord: string, isLastWord: boolean }[] = [];

  constructor(private wordService: WordService, private textService: TextsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.wordService.getWords().subscribe();

    this.activatedRoute.params.subscribe(params => {

      this.text = this.textService.getText(params['textid']) as Text;

      this.unkownWords = this.text.unKnownWords as number;


      this.compoundWords(this.text.body);

      this.pages = this.createPages(this.text.body);
      this.currentPage = this.pages[this.pangeNr];

      console.log("pages", this.pages);

    })


    this.wordService.updatedWord.subscribe(() => {

      console.log("add word ");
      this.unkownWords = this.wordService.countUnknownWords(this.text.body);

    })


  }

  compoundWords(paragraph: string): { wordIndex: number, compoundWord: string, isLastWord: boolean }[] {


    let textWords = paragraph.split(" ");
    let compoundWordsInParagraph: { wordIndex: number, compoundWord: string, isLastWord: boolean }[] = [];


    textWords.forEach((word, wordIndex) => {

      let cleanWord = word.replace(/[[0-9.,«»;!?]+/g, "").toLowerCase();

      let matchedCompoundWords = this.wordService.compoundWords.filter(compoundWord => {


        return compoundWord.word.split(" ")[0].toLowerCase().replace(/[[0-9.,«»;!?]+/g, "") === cleanWord;

      })


      if (matchedCompoundWords.length > 0) {
        // console.log("word", word);
        // console.log("matched compoundWords", matchedCompoundWords);

        matchedCompoundWords.forEach(matchedCompoundWord => {

          let wordsAfter: string = "";

          let compoundWordLength = matchedCompoundWord.word.split(" ").length;


          let maxIndex = wordIndex + compoundWordLength;

          let possibleCompoundWords: { wordIndex: number, compoundWord: string, isLastWord: boolean }[] = [];


          for (let i = wordIndex; i < maxIndex; i++) {

            wordsAfter += " " + textWords[i];

            if (i === maxIndex - 1) {
              // console.log("last word",textWords[i]);
              possibleCompoundWords.push({
                wordIndex: i,
                compoundWord: matchedCompoundWord.word,
                isLastWord: true
              })


            } else {

              possibleCompoundWords.push({
                wordIndex: i,
                compoundWord: matchedCompoundWord.word,
                isLastWord: false
              })
            }


          }


          // console.log("Index", index);


          if (wordsAfter.trim().replace(/[[0-9.,«»;!?]+/g, "").toLowerCase() === matchedCompoundWord.word.trim().replace(/[[0-9.,«»;!?]+/g, "").toLowerCase()) {


            //this.wordsInCompoundWord = this.wordsInCompoundWord.concat(possibleCompoundWord);

            compoundWordsInParagraph = compoundWordsInParagraph.concat(possibleCompoundWords);

          }


        })

      }


    })




    return compoundWordsInParagraph;


  }


  createPages(textBody: string) {

    let allWords = textBody.split(" ");
    let nrPages = allWords.length / 330;

    let startIndex = 0;
    let endIndex = 330;
    let pages: Page[] = [];

    let page: Page = new Page([], []);


    let paragraphs = textBody.split(/\n/);

    let pageLength = 0;
    let nrParagraphs = 0;


    paragraphs.forEach((paragraph,paragraphIndex)=>{


      let paragraphLength = paragraph.split(" ").length;
      let compoundWords = this.compoundWords(paragraph);


      let compoundWordsWithParagraphIndex = compoundWords.map(compoundWord => {
        return {paragraphIndex: paragraphIndex, ...compoundWord}
      })



      if (paragraphLength + pageLength <= 330 && nrParagraphs < 6) {


        let paragraphWords = paragraph.split(" ");

        page.paragraphs.push(paragraphWords);



        // @ts-ignore
        page.wordsInCompoundWord = page.wordsInCompoundWord.concat(compoundWordsWithParagraphIndex);

        pageLength += paragraphLength;
        nrParagraphs++;

      } else {

        pages.push(page);
        page = new Page([], []);
        pageLength = 0;
        nrParagraphs = 0;

        let paragraphWords = paragraph.split(" ");

        page.paragraphs.push(paragraphWords);
        // @ts-ignore
        page.wordsInCompoundWord = page.wordsInCompoundWord.concat(compoundWordsWithParagraphIndex);

        pageLength += paragraphLength;
        nrParagraphs++;


      }

    })
    //
    // for (let paragraph of paragraphs) {
    //
    //   let paragraphLength = paragraph.split(" ").length;
    //
    //   if (paragraphLength + pageLength <= 330 && nrParagraphs < 6) {
    //
    //
    //     let paragraphWords = paragraph.split(" ");
    //
    //     page.paragraphs.push(paragraphWords);
    //
    //     pageLength += paragraphLength;
    //     nrParagraphs++;
    //
    //   } else {
    //
    //     pages.push(page);
    //     page = new Page([], []);
    //     pageLength = 0;
    //     nrParagraphs = 0;
    //
    //     let paragraphWords = paragraph.split(" ");
    //
    //     page.paragraphs.push(paragraphWords);
    //
    //     pageLength += paragraphLength;
    //     nrParagraphs++;
    //
    //
    //   }
    //
    // }

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

    if (this.unkownWords !== this.text.unKnownWords) this.textService.updateText(new Text(this.text.id, this.text.name, this.text.body, this.unkownWords))
  }


  onPageDown() {

    if (this.pangeNr > 0) {
      this.pangeNr--;

      this.currentPage = this.pages[this.pangeNr];

    }

  }

  onPageUp() {

    if (this.pangeNr + 1 <= this.pages.length - 1) {

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
  constructor(public paragraphs: string[][], public wordsInCompoundWord: { paragraphIndex: number, wordIndex: number, compoundWord: string, isLastWord: boolean }[]) {
  }

}

