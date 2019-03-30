import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { tap, map, finalize, startWith } from 'rxjs/operators';
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
    this.startWithTesting();
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
}
