import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TextsListComponent} from "./texts/texts-list/texts-list.component";
import {AddTextComponent} from "./texts/add-text/add-text.component";

const routes: Routes = [
  {
    path: "texts",
    component: TextsListComponent,
    children: [{
      path: "add",
      component: AddTextComponent

    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
