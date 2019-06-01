import { Component, OnInit } from '@angular/core';
import { ButtonConfig } from '../popup/popup.component';

@Component({
  selector: 'app-reusable-popup',
  templateUrl: './reusable-popup.component.html',
  styleUrls: ['./reusable-popup.component.css']
})
export class ReusablePopupComponent implements OnInit {

  buttonConfig = {} as ButtonConfig;
  firstButtonName: string;
  secondButtonName: string;
  content: string;
  title: string;

  showDynamicPopup: boolean = false;
  showHardCodedPopup: boolean = false;
  cascaded: boolean = false;
  buttonConfig2 = {
    'button1': {
      'buttonName': 'Hardcoded button',
      'buttonType': 'first-button'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  openDynamicPopup() {
    this.buttonConfig = Object.assign({}, {
      'button1': {
        'buttonName': this.firstButtonName,
        'buttonType': 'first-button'
      },
      'button2': {
        'buttonName': this.secondButtonName,
        'buttonType': 'second-button'
      }
    });

    this.showDynamicPopup = true;
  }

  popupEventsForDynamicPopup(event: string) {

    if (event == 'first-button') { this.showDynamicPopup = false; }

    if (event == 'second-button') {
      // do something
      this.showDynamicPopup = false;
    }
    if (event == 'POPUP_CLOSED_AFTER_TRANSITION' && this.cascaded) { this.openHardCodedPopup(); }

  }

  openHardCodedPopup() {
    this.showHardCodedPopup = true;
    this.cascaded = false;
  }

  popupEventsForHardCoded(event: string) {
    this.showHardCodedPopup = false;
  }

  openCascadedPopup() {
    this.cascaded = true;
    this.openDynamicPopup();
  }


}
