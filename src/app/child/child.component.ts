import { Component, OnInit, Input } from '@angular/core';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }
  @Input() observer;
  ngOnInit() {

  }

}
