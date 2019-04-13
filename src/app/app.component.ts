import { Component, OnInit } from '@angular/core';
import { PartialObserver, Subject, AsyncSubject, Observable, observable, Observer, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, last } from 'rxjs/operators';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  subject: Subject<any>;

  constructor() {
  }


  ngOnInit() {
    // this.unicastObservable();
    // this.multicastSubject();

    // this.convertUnicastObservableToMulticast();

    // this.behaviourSubjectTesting();
    // this.asyncSubjectTesting();
    // this.pureSubject();
    // this.asyncSubject();
    // this.subjectWithLast();
    // this.subjectOnlyTesting();

    this.makingSubjectToAsyncSubject();
  }


  public unicastObservable() {
    // tslint:disable-next-line:no-shadowed-variable
    const observable = Observable.create((observer) => {
      console.log('here');
      observer.next(Math.random());
    });

    //both will have independent values

    const observer: Observer<any> = {
      'next': (x) => console.log(x),
      'complete': () => console.log('completed'),
      'error': (err) => console.log('error')
    };

    observable.subscribe(observer);
    observable.subscribe(x => console.log(x));
  }


  multicastSubject() {
    const subject = new Subject();

    subject.subscribe((x) => console.log(x));
    subject.subscribe((x) => console.log(x));

    subject.next(
      Math.random()
    );

    subject.subscribe(console.log);
    subject.next(
      Math.random()
    );
  }


  convertUnicastObservableToMulticast() {
    const observable = Observable.create((observer) => {
      console.log('here');
      observer.next(Math.random());
    });

    const subject$ = new Subject();

    subject$.subscribe(x => console.log(x));

    subject$.subscribe(x => console.log(x));

    observable.subscribe(subject$);
  }


  subjectOnlyTesting() {
    const subject = new Subject();
    subject.subscribe((x) => console.log(x));
    subject.subscribe((x) => console.log(x));

    subject.next(
      Math.random()
    );

    subject.subscribe(console.log);
    subject.next(
      Math.random()
    );

    subject.complete();

    subject.subscribe(
      () => { },
      (error) => { },
      () => console.log('complete')
    );
  }

  /** Observer always recieves the last value emitted by the bevahiour subject */
  behaviourSubjectTesting() {
    const subject = new BehaviorSubject<any>('ok');

    subject.subscribe((x) => console.log(x));
    subject.subscribe((x) => console.log(x));

    subject.next(
      Math.random()
    );

    subject.complete();

    subject.subscribe(console.log,
      (error) => { },
      () => console.log('complete'));

  }

  asyncSubjectTesting() {
    const subject = new AsyncSubject();
    subject.next('ok');
    subject.next('lala');
    subject.complete();
    subject.next('dslkfsd');

    subject.subscribe(console.log);
  }


  /**
   * Async subject works when the observer completes. It emits the last value.
   */
  public asyncSubject() {
    this.subject = new AsyncSubject<any>();

    this.subject.subscribe(x => console.log(x));
  }


  public subjectWithLast() {
    this.subject = new Subject<any>();
    const lastSub$ = this.subject.pipe(
      // last()
    );

    this.subject.next('lola5');
    this.subject.next('lola4');
    this.subject.next('lola3');
    this.subject.next('lola2');
    this.subject.complete();
    lastSub$.subscribe(x => { console.log(x); });

    // this.subject.complete();
    // lastSub$.subscribe(x => console.log(x));
  }

  public pureSubject() {
    this.subject = new Subject();
    this.subject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      (x) => console.log(x)
    );
  }

  public makingSubjectToAsyncSubject() {

    const subject$ = new Subject();

    const fakeAsync$ = subject$.pipe(
      last()
    );

    fakeAsync$.subscribe(console.log);

    subject$.next(5);
    subject$.next(10);
    subject$.complete();

    subject$.subscribe(console.log, () => { }, () => console.log('completed'));

  }





}
