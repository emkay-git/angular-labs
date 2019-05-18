import { Observable, Subject, interval } from 'rxjs';
import { startWith, mergeMap, tap, filter, takeUntil } from 'rxjs/operators';

export class Poller {

    public poller$(myObs$: Observable<any>, func: any) {
        const pollStop = new Subject();
        return interval(1000).pipe(
            startWith(0),
            mergeMap(_ => myObs$),
            filter((val) => func(val)),
            tap(_ => { pollStop.next(); pollStop.complete(); }),
            takeUntil(pollStop)
        );
    }


}
