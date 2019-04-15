import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
