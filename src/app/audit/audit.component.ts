import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, tap, auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  value = 1;
  auditSubject = new Subject<number>();
  stack: number[] = [];
  time: number = 0;
  interval: any;
  flag: boolean = false;
  timerStatus: string = '';
  constructor() { }

  ngOnInit() {

    this.auditSubject.pipe(
      auditTime(2000),
      tap(val => {
        this.stack.push(val);
        clearInterval(this.interval);
        this.flag = false;
      })
    ).subscribe();
  }

  auditMe() {
    if (!this.flag) {
      this.time = 0;
      this.flag = true;
      this.interval = setInterval(() => {
        this.time = this.time + 1;
      }, 1000);
    }

    this.auditSubject.next(this.value);
    this.value += 1;
  }
}
