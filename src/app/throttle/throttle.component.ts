import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-throttle',
  templateUrl: './throttle.component.html',
  styleUrls: ['./throttle.component.css']
})
export class ThrottleComponent implements OnInit {

  value = 1;
  throttleSubject = new Subject<number>();
  stack: number[] = [];
  time: number = 0;
  interval: any;
  flag: boolean = false;
  timerStatus: string = '';
  constructor() { }

  ngOnInit() {

    this.throttleSubject.pipe(
      throttleTime(5000),
      tap(val => {
        this.stack.push(val);
      })
    ).subscribe();
  }

  throttleMe() {
    if (!this.flag) {
      this.time = 0;
      this.flag = true;
      this.interval = setInterval(() => {
        this.time = this.time + 1;
        if (this.time == 5) {
          clearInterval(this.interval);
          this.flag = false;
        }
      }, 1000);
    }

    this.throttleSubject.next(this.value);
    this.value += 1;
  }
}
