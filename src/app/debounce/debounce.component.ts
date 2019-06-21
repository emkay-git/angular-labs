import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.css']
})
export class DebounceComponent implements OnInit {

  value = 1;
  debounceSubject = new Subject<number>();
  stack: number[] = [];
  time: number = 0;
  interval: any;
  constructor() { }

  ngOnInit() {

    this.debounceSubject.pipe(
      debounceTime(2000),
      tap(val => {
        this.stack.push(val);
        clearInterval(this.interval);

      })
    ).subscribe();
  }

  debounceMe() {
    this.time = 0;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.time = this.time + 1;
    }, 1000);

    this.debounceSubject.next(this.value);
    this.value += 1;
  }

}
