import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { SharedPopupsComponent } from './shared-popups/shared-popups.component';
import { Comp1Component } from './shared-popups/comp1/comp1.component';
import { Comp2Component } from './shared-popups/comp2/comp2.component';
import { ReusablePopupComponent } from './reusable-popup/reusable-popup.component';
import { APIService } from './shared-popups/api.service';


const routes: Routes = [
  { path: '', redirectTo: 'reusable', pathMatch: 'full' },
  { path: 'shared', component: SharedPopupsComponent },
  { path: 'reusable', component: ReusablePopupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    SharedPopupsComponent,

    Comp1Component,
    Comp2Component,
    ReusablePopupComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PopupService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
