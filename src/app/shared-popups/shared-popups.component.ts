import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-shared-popups',
  templateUrl: './shared-popups.component.html',
  styleUrls: ['./shared-popups.component.css']
})
export class SharedPopupsComponent implements OnInit {

  constructor(public popupService: PopupService) { }

  ngOnInit() {
  }

}
