import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeOperatorsComponent } from './time-operators/time-operators.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { DebounceComponent } from './debounce/debounce.component';
import { AuditComponent } from './audit/audit.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeOperatorsComponent,
    ThrottleComponent,
    DebounceComponent,
    AuditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
