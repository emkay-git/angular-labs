import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { PopupService } from 'src/app/popup/popup.service';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {


  @ViewChild('body', { read: TemplateRef }) body: TemplateRef<any>;
  constructor(private _popupService: PopupService) { }

  ngOnInit() {
    // interval(10000).pipe(startWith(0)).subscribe(_ => this.openPopup());

  }

  openPopup() {
    this._popupService.showPopup(this.body, {
      'button1': {
        'buttonName': 'Shared Popup 1',
        'buttonType': 'close'
      }
    }).subscribe((val) => {
      console.log('1');
      if (val.buttonType == 'close') { this._popupService.closePopup(); }
    });
  }

}
