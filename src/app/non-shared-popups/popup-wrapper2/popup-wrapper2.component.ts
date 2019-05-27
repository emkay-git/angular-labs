import { Component, OnInit } from '@angular/core';
import { ButtonConfig } from 'src/app/popup/popup.component';

@Component({
  selector: 'app-popup-wrapper2',
  templateUrl: './popup-wrapper2.component.html',
  styleUrls: ['./popup-wrapper2.component.css']
})
export class PopupWrapper2Component implements OnInit {

  showPopup: boolean = false;
  buttonConfig: ButtonConfig = {
    'button1': {
      'buttonName': 'Close Popup2',
      'buttonType': 'closed'
    },
    'button2': {
      'buttonName': 'Cancel',
      'buttonType': 'cancel'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  openPopup() {
    this.showPopup = true;
  }

  popupEvents(event) {
    console.log(event);
    if (event.eventType == 'popup-close') {
      if (event.buttonType == 'closed') { this.showPopup = false; }
      if (event.buttonType == 'cancel') { this.showPopup = false; }
    }
  }

}
