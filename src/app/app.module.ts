import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoggerInterceptor } from './services/interceptor-log.service';
import { CacheInterceptor } from './services/interceptor-cache.service';
import { RefresherInterceptor } from './services/interceptor-refresher.service';
import { GlobalService } from './services/global.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GlobalService,
    { provide: HTTP_INTERCEPTORS, useClass: RefresherInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
