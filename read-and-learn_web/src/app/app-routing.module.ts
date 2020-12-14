import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TextsListComponent} from "./texts/texts-list/texts-list.component";
import {AddTextComponent} from "./texts/add-text/add-text.component";
import {TextsComponent} from "./texts/texts/texts.component";
import {ReadTextsComponent} from "./texts/read-texts/read-texts.component";
import {WordsComponent} from "./words/words/words.component";
import {WordsListComponent} from "./words/words-list/words-list.component";
import {WordEditComponent} from "./words/word-edit/word-edit.component";
import {TextsResolver} from "./texts/texts.resolver";

const routes: Routes = [
  {
    path: "texts",
    component: TextsComponent,
    children: [{
      path: "",
      pathMatch: "full",
      component: TextsListComponent


    },
      {
        path: "add",
        component: AddTextComponent

      },
      {
        path: ":textid/:textname",
        resolve: {textData: TextsResolver},
        component: ReadTextsComponent

      }


    ]
  },
  {
    path: "words",
    component: WordsComponent,
    children: [{

      path: "",
      pathMatch: "full",
      component: WordsListComponent

    },
      {
        path: "edit",
        component: WordEditComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
