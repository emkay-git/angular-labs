import { Component, OnInit } from '@angular/core';
import { ButtonConfig } from 'src/app/popup/popup.component';

@Component({
  selector: 'app-popup-wrapper1',
  templateUrl: './popup-wrapper1.component.html',
  styleUrls: ['./popup-wrapper1.component.css']
})
export class PopupWrapper1Component implements OnInit {

  message: string = 'I am from Popup 1';
  showPopup: boolean = false;
  buttonConfig: ButtonConfig = {
    'button1': {
      'buttonName': 'Close Popup1',
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
    if (event.eventType == 'popup-close') {
      if (event.buttonType == 'closed') { this.message = 'You clicked on 1st button'; }
      if (event.buttonType == 'cancel') { console.log("You clicked on 2nd button"); this.showPopup = false; }
    }
  }

}
