import { Component } from '@angular/core';
import { PopupService } from './popup/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _popupService: PopupService) {

  }

  test() {
    console.log("inside'");
  }
}
