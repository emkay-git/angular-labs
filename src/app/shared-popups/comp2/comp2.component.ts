import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PopupService } from 'src/app/popup/popup.service';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {

  @ViewChild('body', { read: TemplateRef }) body: TemplateRef<any>;
  constructor(private _popupService: PopupService) { }

  ngOnInit() {
    // this.openPopup();
    // interval(12000).pipe(startWith(0)).subscribe(_ => this.openPopup());
  }

  openPopup() {
    this._popupService.showPopup(this.body, {
      'button1': {
        'buttonName': 'Shared Popup 2',
        'buttonType': 'close'
      }
    }).subscribe((val) => {
      console.log('2');
      if (val.buttonType == 'close') { this._popupService.closePopup(); }
    });
  }
}
