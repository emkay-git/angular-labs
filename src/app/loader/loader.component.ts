import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from '../helper.service';
import { Subscription, Subject, throwError, of } from 'rxjs';
import { Poller } from '../poller.service';
import { takeUntil, take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  constructor(private _helperService: HelperService, private _pollerService: Poller) { }
  count = 1;
  sub: Subscription;
  destroyer$: Subject<any> = new Subject();
  stopPoll: boolean = false;

  ngOnInit() {
    const func = x => this.pollingEvaluation(x); // truth function reference
    const pollingObservable = this._helperService.getDummyData(); // api endpoint observable

    this.sub = this._pollerService.poller$(pollingObservable, func).pipe(
      catchError((error) => { console.log(error); return 'error'; })
    ).subscribe();

  }


  // it's our truth function which returns true when API has been called 6 times.
  pollingEvaluation(data) {
    if (this.count++ > 5) {
      this.stopPoll = true;
      return true;
    }
  }

  // handling leaks on component destroy;
  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
