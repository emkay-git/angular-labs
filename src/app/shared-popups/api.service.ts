import { Injectable } from "@angular/core";
import { throwError, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PopupService } from "../popup/popup.service";

@Injectable()
export class APIService {
    constructor(private popupService: PopupService) { }

    public serviceComp1(): Observable<any> {
        return throwError("I am error from API 1 in component 1").pipe(
            catchError((error) => {

                this.handleError(error);
                return of('Handled');
            })
        );
    }

    public serviceComp2(): Observable<any> {
        return throwError("I am error from API 2 in component 2").pipe(
            catchError((error) => {
                this.handleError(error);
                return of('Handled');
            })
        );
    }

    public service2Comp1(): Observable<any> {
        return throwError("OOOPS!! One more error. I am error from API 2 in component 1").pipe(
            catchError((error) => {
                this.handleError(error);
                return of('Handled');
            })
        );
    }

    public handleError(error) {
        this.popupService.showPopup({
            'button1': {
                'buttonName': "okay",
                'buttonType': 'okay'
            }
        }, error).subscribe(_ => this.popupService.closePopup());
    }
}