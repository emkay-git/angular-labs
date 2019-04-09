import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
@Component({
  selector: 'app-leaky',
  templateUrl: './leaky.component.html',
  styleUrls: ['./leaky.component.css']
})
export class LeakyComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  constructor() { }
  subscription: Subscription;
  ngOnInit() {
    const tickingClock$ = interval(1000);
    this.subscription = tickingClock$
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    //comment it to see the leaky behaviourdestory

    // It's an imperative approach
    // this.subscription.unsubscribe();

    // Using takeWhile is more of a declarative approach
    this.destroy$.next();
    this.destroy$.complete();

    //Using take(1) doesn't require any usnsubscripition here. But one thing to keep in mind is, it doesn't trigger if we don't receive the first
    //emitted value from the obesrvable.
  }

}
