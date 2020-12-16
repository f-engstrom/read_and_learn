export class Text{

  constructor(public id:string, public name:string,public body:string, public nrOfWords:number,public unKnownWords?:number ) {

    this.urlSlug = this.makeUrlSlug(name);
  }
  public urlSlug:string;

  makeUrlSlug(name:string){
    return name.replace(/ /g, "-").toLowerCase();
  }

}
