export class Text {

  constructor(public id: string, public name: string, public body: string, public unKnownWords?: number) {

    this.urlSlug = this.makeUrlSlug(name);
    this.uniqueWords = this.countUniqueWords(body);
    this.nrWords = this.nrWords= this.totalNrWords(body);

  }

  public urlSlug: string;
  public uniqueWords: number;
  public nrWords:number;

  makeUrlSlug(name: string) {
    return name.replace(/ /g, "-").toLowerCase();
  }

  countUniqueWords(text: string) {

    const onlyText = text.replace(/[[0-9.,«»:;!?\n]+/g, "");
    const words = onlyText.split(" ");
    const unique = words.filter(this.onlyUnique);

    return unique.length;

  }
  totalNrWords(text:string){
    const onlyText = text.replace(/[[0-9.,«»:;!?\n]+/g, "");
    const words = onlyText.split(" ");
    return words.length;

  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }


}
