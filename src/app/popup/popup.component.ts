import {
  Component, OnInit, Input, ViewChild, TemplateRef, OnChanges,
  ViewContainerRef, Output, EventEmitter, SimpleChanges
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

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

  constructor() {

  }


  @ViewChild('body', { read: ViewContainerRef }) vc: ViewContainerRef;
  @Input('body') body: TemplateRef<any>;
  @Input() buttonConfig: ButtonConfig;
  @Input() showPopup: boolean = false;
  @Output('popup-events') popupEvents: EventEmitter<any> = new EventEmitter<any>();

  modalId: string = '';

  ngOnInit() {

    this.modalId = 'a' + Math.random().toString(35).substring(7);

    // Each modal should hahve a unique Id for it to work.


    if (!this.buttonConfig) {
      throw new Error('You must provide atleast one Button');
    }


  }

  ngOnChanges() {
    if (this.modalId) {
      if (this.showPopup) {
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

    this.popupEvents.emit({
      'eventType': 'popup-close',
      'buttonType': button ? button.buttonType : 'none'
    });

  }

  ngAfterViewInit() {
    jQuery('#' + this.modalId).on('hidden.bs.modal', _ => {
      this.popupEvents.next('POPUP_CLOSED_AFTER_TRANSITION');
    })

  }
}
