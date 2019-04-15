import { Component, OnInit, Input, ViewChild, TemplateRef, OnChanges, ViewContainerRef } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

  constructor() { }

  @ViewChild('body', { read: ViewContainerRef }) vc: ViewContainerRef;
  @Input('body') body: TemplateRef<any>;
  @Input() showPopup: boolean = false;

  ngOnInit() {
    if (this.showPopup) { this.openPopup(); }
  }

  ngOnChanges() {
    if (this.showPopup) {
      this.vc.insert(this.body.createEmbeddedView(null));
      this.openPopup();

    }
  }

  openPopup() {
    jQuery('#myModal').modal('show');
  }
}
