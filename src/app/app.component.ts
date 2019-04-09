import { Component, OnInit } from '@angular/core';
import { of, interval } from 'rxjs';
import { tap, map, finalize, startWith, mergeMap, delay, concatMap, takeWhile, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _httpClient: HttpClient) {

  }
  ngOnInit() {
    // this.tapTesting();
    // this.mapTesting();
    // this.finalizeTesting();
    // this.finalizeTestingWithHttp();
    // this.startWithTesting();
    // this.mergeMapTesting();
    this.concatMapTesting();

  }

  /**
   * map is used for mapping observable data to our choice and return that value then.
   * It hence maps the data to another.
   */
  public mapTesting() {

    of(1, 2, 3, 4).pipe(
      map<number, string>((data) => data.toString() + ' ok',
        error => console.log(error)
      )).subscribe(data =>
        console.log('subscribe', data)
      );
  }

  /**
   * tap is used for creating any side effects, and return the observable data untouched.
   * It's simply tapping the values, doing something and then giving back the same observable.
   */
  public tapTesting() {
    of(1, 2, 3, 4).pipe(
      tap(data => data.toString() + ' ok tap'
      )
    ).subscribe(data =>
      console.log('subscribe', data)
    );
  }

  /**
   * It get's executed after observable has been completed fully.
   */
  public finalizeTesting() {
    of(1, 2, 3, 4).pipe(
      finalize(() => this.finalizeHelper('from finalize'))
    ).subscribe((data) => console.log(data),
      (error) => { console.log('error'); },
      () => this.finalizeHelper('from subscribe'));
  }

  /**
   * finalize always get executed whether error occured or not, where as on subscribing,
   * completes get executed only when observable completes succesully.
   */
  public finalizeTestingWithHttp() {
    this._httpClient.get('http://dummy.restapiexample.com/api/v1/employe').pipe(
      finalize(() => { this.finalizeHelper('from finalize'); })
    ).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => this.finalizeHelper('from finalizeTestingWIthHttp')
    );
  }

  private finalizeHelper(message) {
    console.log(message);
  }


  public startWithTesting() {
    of(1, 2, 3, 4, 5).pipe(
      startWith('ola')
    ).subscribe((data) => console.log(data));
  }

  public mergeMapTesting() {
    const timerObservable$ = interval(1000);

    // of(timerObservable$, timerObservable$, timerObservable$)
    //   .pipe(
    //     map((data) => {
    //       data.subscribe((data) => { console.log(data); })
    //     }
    //     )).subscribe(() => { });

    // same code with mergeMap
    const hello$ = val => of(`${val} World!`);
    // timerObservable$
    //   .pipe(
    //     mergeMap((val) => hello$(val))
    //   ).subscribe(data => console.log(data));

    timerObservable$.pipe(
      map(data => hello$(data))
    ).subscribe(data => console.log(data));
  }
  

  /**
   * concatMap - waits for the first subscriber to complete and then subscribe to new one
   * mergeMap - subscribe to all in the sequence
   * switchMap - cancels the current subscription and subscribe to latest one.
   */
  public concatMapTesting() {
    const temp$ = value => of(`${value} says Mohit`);

    // interval(10000).pipe(
    //   concatMap(val => temp$(val))
    // ).subscribe(x => console.log(x));

    const newInterval$ = val => interval(1000).pipe(
      takeWhile(x => x < 5)
    );

    // newInterval$(4).subscribe(x => console.log(x, 4));
    of(1, 2, 3, 4).pipe(
      switchMap(x => newInterval$(x))
    ).subscribe((val) => { console.log(val); });
  }


}

