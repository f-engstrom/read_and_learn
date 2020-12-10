import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TextsListComponent} from "./texts/texts-list/texts-list.component";

const routes: Routes = [
  {
    path:"texts",
    component:TextsListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
