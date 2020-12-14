import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TextsListComponent } from './texts/texts-list/texts-list.component';
import { AddTextComponent } from './texts/add-text/add-text.component';
import { TextsComponent } from './texts/texts/texts.component';
import {FormsModule} from "@angular/forms";
import { ReadTextsComponent } from './texts/read-texts/read-texts.component';
import { HttpClientModule} from "@angular/common/http";
import { WordEditComponent } from './words/word-edit/word-edit.component';
import { WordsListComponent } from './words/words-list/words-list.component';
import { WordAddOrUpdateComponent } from './words/word-add-or-update/word-add-or-update.component';
import { WordsComponent } from './words/words/words.component';
import { RenderWordsComponent } from './texts/render-words/render-words.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextsListComponent,
    AddTextComponent,
    TextsComponent,
    ReadTextsComponent,
    WordEditComponent,
    WordsListComponent,
    WordAddOrUpdateComponent,
    WordsComponent,
    RenderWordsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
