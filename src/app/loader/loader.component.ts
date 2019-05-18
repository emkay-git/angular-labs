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
  count = 0;
  sub: Subscription;
  destroyer$: Subject<any> = new Subject();
  stopPoll: boolean = false;

  ngOnInit() {
    const func = x => this.pollingEvaluation(x);
    const pollingObservable = this._helperService.getDummyData();

    this.sub = this._pollerService.poller$(pollingObservable, func).pipe(
      catchError((error) => { console.log(error); return 'error'; })
    ).subscribe();

  }



  pollingEvaluation(data) {
    if (this.count++ > 5) {
      this.stopPoll = true;
      return true;
    }
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
