import { Injectable, TemplateRef } from "@angular/core";
import { Subject } from "rxjs";
import { ButtonConfig } from "./popup.component";

@Injectable()
export class PopupService {

    /** This array holds requests made for popup.
     * Use case is: If there are two or more consecutives popup to be opened
     * it will open the first one and keep popup request for other popups and opens next popup only when
     * first popup has been closed.
     */
    private _popupRequest: any[] = [];

    isPopupVisible: boolean = false;
    body: TemplateRef<any>;
    buttonConfig: ButtonConfig = {
        'button1': {
            'buttonName': 'Test Button',
            'buttonType': 'test'
        }
    };

    /** Handles showing popup and stores data for following popups */
    showPopup(body: TemplateRef<any>, buttonConfig: ButtonConfig) {
        const popupSubject = new Subject();

        if (this._popupRequest.length == 0) {
            this.openCurrentPopup(body, buttonConfig);
        }
        this._popupRequest.push({
            'body': body,
            'buttonConfig': buttonConfig,
            'subject': popupSubject
        });

        return popupSubject.asObservable();
    }

    /** Handles Event emitted by Popup component */
    popupEvent(event) {

        if (event == 'POPUP_CLOSED_AFTER_TRANSITION') {
            this.openNextPopup();
        } else {
            this._popupRequest[0]['subject'].next(event);
        }
    }

    closePopup() {
        this.isPopupVisible = false;
        this.body = null;
        this.buttonConfig = null;
        this._popupRequest[0]['subject'].complete();
    }

    /** If there is any available popup request it will open it. */
    private openNextPopup() {
        this._popupRequest = this._popupRequest.slice(1);
        if (this._popupRequest.length > 0) { this.openCurrentPopup(this._popupRequest[0].body, this._popupRequest[0].buttonConfig); }
    }

    /** It opens the current popup */
    private openCurrentPopup(body, buttonConfig) {
        this.buttonConfig = buttonConfig ? buttonConfig : this.buttonConfig;
        this.body = body;
        this.isPopupVisible = true;
    }



}
