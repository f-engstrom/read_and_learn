import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TextsListComponent} from "./texts/texts-list/texts-list.component";
import {AddTextComponent} from "./texts/add-text/add-text.component";
import {TextsComponent} from "./texts/texts/texts.component";
import {ReadTextsComponent} from "./texts/read-texts/read-texts.component";

const routes: Routes = [
  {
    path: "texts",
    component: TextsComponent,
    children: [{
      path:"",
      pathMatch:"full",
      component:TextsListComponent


    },
      {
      path: "add",
      component: AddTextComponent

    },
      {
        path:":textid/:textname",
        component:ReadTextsComponent

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
