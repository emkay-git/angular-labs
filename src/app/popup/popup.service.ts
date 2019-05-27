import { Injectable, TemplateRef } from "@angular/core";
import { Subject } from "rxjs";
import { ButtonConfig } from "./popup.component";

@Injectable()
export class PopupService {

    isPopupVisible: boolean = false;
    body: TemplateRef<any>;
    private popupSubject: Subject<any>;
    buttonConfig: ButtonConfig = {
        'button1': {
            'buttonName': 'Test Button',
            'buttonType': 'test'
        }
    };

    showPopup(body: TemplateRef<any>, buttonConfig: ButtonConfig) {
        this.popupSubject = new Subject();
        this.buttonConfig = buttonConfig ? buttonConfig : this.buttonConfig;
        this.body = body;
        this.isPopupVisible = true;
        return this.popupSubject.asObservable();
    }


    popupEvent(event) {
        this.popupSubject.next(event);
    }

    closePopup() {
        this.isPopupVisible = false;
        this.body = null;
        this.buttonConfig = null;
        this.popupSubject.complete();
    }

}
