import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { SharedPopupsComponent } from './shared-popups/shared-popups.component';
import { NonSharedPopupsComponent } from './non-shared-popups/non-shared-popups.component';
import { PopupWrapper2Component } from './non-shared-popups/popup-wrapper2/popup-wrapper2.component';
import { PopupWrapper1Component } from './non-shared-popups/popup-wrapper1/popup-wrapper1.component';
import { Comp1Component } from './shared-popups/comp1/comp1.component';
import { Comp2Component } from './shared-popups/comp2/comp2.component';


const routes: Routes = [
  { path: '', redirectTo: 'non-shared', pathMatch: 'full' },
  { path: 'shared', component: SharedPopupsComponent },
  { path: 'non-shared', component: NonSharedPopupsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    SharedPopupsComponent,
    NonSharedPopupsComponent,
    PopupWrapper2Component,
    PopupWrapper1Component,
    Comp1Component,
    Comp2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
