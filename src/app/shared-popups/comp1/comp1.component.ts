import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PopupService } from '../../popup/popup.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  message = 'I am from shared popup 1';
  @ViewChild('body', { read: TemplateRef }) body: TemplateRef<any>;
  @ViewChild('body2', { read: TemplateRef }) body2: TemplateRef<any>;

  constructor(private _popupService: PopupService) { }


  ngOnInit() {
  }


  openPopup() {

    this._popupService.showPopup(this.body, {
      'button1': {
        'buttonName': 'Shared Popup 1',
        'buttonType': 'close'
      }
    }).subscribe(_ => {
      this._popupService.closePopup();

      this._popupService.showPopup(this.body2, {
        'button1': {
          'buttonName': 'Another',
          'buttonType': 'another'
        }
      }).subscribe((data) => { this._popupService.closePopup(); });
    });
  }

}
