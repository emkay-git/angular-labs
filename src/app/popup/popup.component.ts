import {
  Component, OnInit, Input, ViewChild, TemplateRef, OnChanges,
  ViewContainerRef, Output, EventEmitter, AfterViewInit
} from '@angular/core';

declare var jQuery: any;

export interface ButtonConfig {
  button1: Button;
  button2?: Button;
}

interface Button {
  buttonType: string;
  buttonName: string;
}


/**
 * interfaces
 * @inputs
 * * title - modal title
 * * popupBody - modal body
 * * buttonConfig - modal buttons
 * * showPopup - controls if popup has to be closed or not
 * -----
 * @outputs
 * * popup-events - events emitted by popup. There are following:-
 *    * Events emitted on button click. When button is clicked value is emitted as given by the user in buttonType field
 *      of Button interface.
 *    * When modal closes with transition finished event with the value POPUP_CLOSED_AFTER_TRANSITION is emitted..

 */
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() title: string;
  @Input('popupBody') body: TemplateRef<any>;
  @Input() buttonConfig: ButtonConfig;
  @Input() showPopup: boolean = false;

  @Output('popup-events') popupEvents: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('body', { read: ViewContainerRef }) vc: ViewContainerRef;

  modalId: string = '';

  constructor() { }

  ngOnInit() {
    this.title = this.title && this.title.length > 0 ? this.title : 'Default Title';

    // Each modal should hahve a unique Id for it to work.
    this.modalId = 'a' + Math.random().toString(35).substring(7);

    /** In case user has not given any button configuration there are two buttons set by default. */
    if (!(this.buttonConfig && Object.keys(this.buttonConfig).length > 0)) {
      this.buttonConfig = Object.assign({}, {
        'button1': {
          'buttonName': 'Ok',
          'buttonType': 'okay'
        },
        'button2': {
          'buttonName': 'Close',
          'buttonType': 'close'
        }
      });
    }
  }

  /** It checks if modal id is there, if it then it checks if showPopup is true or false and take actions accordingly */
  ngOnChanges() {
    if (this.modalId) {
      if (this.showPopup) {

        if (!(this.buttonConfig && Object.keys(this.buttonConfig).length > 0)) { throw new Error("Provide atleast one button"); }
        if (this.vc) {
          this.vc.clear();
          this.vc.insert(this.body.createEmbeddedView(null));
          jQuery('#' + this.modalId).modal('show');

        }
      } else {
        jQuery('#' + this.modalId).modal('hide');
      }
    }
  }


  closePopup(button?: Button) {
    this.popupEvents.emit(button.buttonType);
  }

  /** It triggers an event when modal has completed the close transaction. */
  ngAfterViewInit() {
    jQuery('#' + this.modalId).on('hidden.bs.modal', _ => {
      this.popupEvents.emit('POPUP_CLOSED_AFTER_TRANSITION');
    });
  }
}
