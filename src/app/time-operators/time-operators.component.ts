import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-operators',
  templateUrl: './time-operators.component.html',
  styleUrls: ['./time-operators.component.css']
})
export class TimeOperatorsComponent implements OnInit {

  operatorName: string = 'debounce';
  constructor() { }

  ngOnInit() {
  }

  showTimeOperator(operatorName: string) {
    this.operatorName = operatorName;
  }
}
