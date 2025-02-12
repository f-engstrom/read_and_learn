import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Text} from "../shared/models/text";
import {map, tap} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {WordService} from "../words/word.service";


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

  constructor(private http: HttpClient,private wordService:WordService) {
  }

  textSub = new Subject<Text[]>();
  texts:Text[]=[];
//    new Text("zwe234","дама с собачкой","Говорили, что на набережной появилось новое лицо: дама с собачкой. \n Дмитрий Дмитрич Гуров, проживший в Ялте уже две недели и привыкший тут, тоже стал интересоваться новыми лицами.\n Сидя в павильоне у Верне, он видел, как по набережной прошла молодая дама, невысокого роста блондинка, в берете: за нею бежал белый шпиц. И потом он встречал ее в городском саду и на сквере по нескольку раз в день. Она гуляла одна, всё в том же берете, с белым шпицем; никто не знал, кто она, и называли ее просто так: дама с собачкой. «Если она здесь без мужа и без знакомых, — соображал Гуров, — то было бы не лишнее познакомиться с ней». Ему не было еще сорока, но у него была уже дочь двенадцати лет и два сына-гимназиста. Его женили рано, когда он был еще студентом второго курса, и теперь жена казалась в полтора раза старше его. Это была женщина высокая, с темными бровями, прямая, важная, солидная и, как она сама себя называла, мыслящая. Она много читала, не писала в письмах ъ, называла мужа не Дмитрием, а Димитрием, а он втайне считал ее недалекой, узкой, неизящной, боялся ее и не любил бывать дома. Изменять ей он начал уже давно, изменял часто и, вероятно, поэтому о женщинах отзывался почти всегда дурно, и когда в его присутствии говорили о них, то он называл их так: — Низшая раса! Ему казалось, что он достаточно научен горьким опытом, чтобы называть их как угодно, но всё же без «низшей расы» он не мог бы прожить и двух дней. В обществе мужчин ему было скучно, не по себе, с ними он был неразговорчив, холоден, но когда находился среди женщин, то чувствовал себя свободно и знал, о чем говорить с ними и как держать себя; и даже молчать с ними ему было легко. В его наружности, в характере, во всей его натуре было что-то привлекательное, неуловимое, что располагало к нему женщин, манило их; он знал об этом, и самого его тоже какая-то сила влекла к ним. Опыт многократный, в самом деле горький опыт, научил его давно, что всякое сближение, которое вначале так приятно разнообразит жизнь и представляется милым и легким приключением, у порядочных людей, особенно у москвичей, тяжелых на подъем, нерешительных, неизбежно вырастает в целую задачу, сложную чрезвычайно, и положение в конце концов становится тягостным. Но при всякой новой встрече с интересною женщиной этот опыт как-то ускользал из памяти, и хотелось жить, и всё казалось так просто и забавно. И вот однажды под вечер он обедал в саду, а дама в берете подходила не спеша, чтобы занять соседний стол. Ее выражение, походка, платье, прическа говорили ему, что она из порядочного общества, замужем, в Ялте в первый раз и одна, что ей скучно здесь... В рассказах о нечистоте местных нравов много неправды, он презирал их и знал, что такие рассказы в большинстве сочиняются людьми, которые сами бы охотно грешили, если б умели, но, когда дама села за соседний стол в трех шагах от него, ему вспомнились эти рассказы о легких победах, о поездках в горы, и соблазнительная мысль о скорой, мимолетной связи, о романе с неизвестною женщиной, которой не знаешь по имени и фамилии, вдруг овладела им. Он ласково поманил к себе шпица и, когда тот подошел, погрозил ему пальцем. Шпиц заворчал. Гуров опять погрозил. Дама взглянула на него и тотчас же опустила глаза. — Он не кусается, — сказала она и покраснела. — Можно дать ему кость? — И когда она утвердительно кивнула головой, он спросил приветливо: — Вы давно изволили приехать в Ялту? — Дней пять. — А я уже дотягиваю здесь вторую неделю. Помолчали немного. — Время идет быстро, а между тем здесь такая скука! — сказала она, не глядя на него. — Это только принято говорить, что здесь скучно. Обыватель живет у себя где-нибудь в Белеве или Жиздре — и ему не скучно, а приедет сюда: «Ах, скучно! Ах, пыль!» Подумаешь, что он из Гренады приехал. Она засмеялась. Потом оба продолжали есть молча, как незнакомые; но после обеда пошли рядом — и начался шутливый, легкий разговор людей свободных, довольных, которым всё равно, куда бы ни идти, о чем ни говорить. Они гуляли и говорили о том, как странно освещено море; вода была сиреневого цвета, такого мягкого и теплого, и по ней от луны шла золотая полоса. Говорили о том, как душно после жаркого дня. Гуров рассказал, что он москвич, по образованию филолог, но служит в банке; готовился когда-то петь в частной опере, но бросил, имеет в Москве два дома... А от нее он узнал, что она выросла в Петербурге, но вышла замуж в С., где живет уже два года, что пробудет она в Ялте еще с месяц и за ней, быть может, приедет ее муж, которому тоже хочется отдохнуть. Она никак не могла объяснить, где служит ее муж, — в губернском правлении или в губернской земской управе, и это ей самой было смешно. И узнал еще Гуров, что ее зовут Анной Сергеевной. Потом у себя в номере он думал о ней, о том, что завтра она, наверное, встретится с ним. Так должно быть. Ложась спать, он вспомнил, что она еще так недавно была институткой, училась, всё равно как теперь его дочь, вспомнил, сколько еще несмелости, угловатости было в ее смехе, в разговоре с незнакомым, — должно быть, это первый раз в жизни она была одна, в такой обстановке, когда за ней ходят, и на нее смотрят, и говорят с ней только с одною тайною целью, о которой она не может не догадываться. Вспомнил он ее тонкую, слабую шею, красивые, серые глаза. «Что-то в ней есть жалкое все-таки», — подумал он и стал засыпать.",5)

  addText(text:Text) {


    const nrWords= text.body.split(" ").length;

    const body = {
      fields:
        {
          textBody: {
            stringValue: text.body
          },
          name:
            {
              stringValue: text.name
            },
          nrWords: {
            integerValue: nrWords
          }
        }
    }



  //  console.log("text", text);
    this.http.post("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/texts/", body).subscribe(res => {
       // console.log("res", res);
      }
    )

    this.texts.push(text);
    this.textSub.next(this.texts);

  }

  deleteText(id:string){

    let oldRecipe = this.texts.findIndex(x => x.id === id);

     this.texts.splice(oldRecipe, 1);

    this.textSub.next(this.texts);

    this.http.delete("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/texts/"+id).subscribe(res => {
      //  console.log("res", res);
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
        return new Text(id, text.fields.name.stringValue, text.fields.textBody.stringValue,this.wordService.countUnknownWords(text.fields.textBody.stringValue));
      })


    }),tap(texts => this.texts =texts));


  }


  getText(id:string){

    return this.texts.find(text=>{

      return text.id === id;

    })

  }

  updateText(text: Text) {

    let oldTextIndex = this.texts.findIndex(x => x.id === text.id);

    this.texts[oldTextIndex] = text;

    this.textSub.next(this.texts.slice());



    const body = {
      fields:
        {
          textBody: {
            stringValue: text.body
          },
          name:
            {
              stringValue: text.name
            },
          nrWords: {
            integerValue: text.nrWords
          }
        }
    }


   // console.log("text", text);
    this.http.patch("https://firestore.googleapis.com/v1/projects/read-and-learn-3577a/databases/(default)/documents/texts/"+text.id, body).subscribe(res => {
      //  console.log("res", res);
      }
    )

  }
}
