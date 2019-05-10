import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { interval, Subject, Observable } from 'rxjs';
import { map, tap, mergeMap, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private _helperService: HelperService) { }
  count = 0;
  notifier$: Subject<any>;
  ngOnInit() {

    this.notifier$ = this.poller$(this.pollingEvaluation.bind(this), this._helperService.getDummyData());

  }


  poller$(evaluateFunc: Function, myObs$: Observable<any>) {
    const notifier$ = new Subject();
    interval(5000).pipe(
      startWith(0),
      mergeMap(_ => myObs$),
      tap((val) => evaluateFunc(val)),
      takeUntil(notifier$)
    ).subscribe();
    return notifier$;
  }

  pollingEvaluation(data: any) {
    if (this.count++ > 6) {
      this.notifier$.complete();
    }
  }

}
