import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { NonLoaderComponent } from './non-loader/non-loader.component';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Poller } from './poller.service';


const routes: Routes = [
  { path: '', redirectTo: 'loader', pathMatch: 'full' },
  { path: 'loader', component: LoaderComponent },
  { path: 'non-loader', component: NonLoaderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NonLoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [HelperService, Poller],
  bootstrap: [AppComponent]
})
export class AppModule { }
