import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TextsListComponent } from './texts/texts-list/texts-list.component';
import { AddTextComponent } from './texts/add-text/add-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextsListComponent,
    AddTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
