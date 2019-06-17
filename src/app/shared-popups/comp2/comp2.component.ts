import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {

  constructor(private _apiService: APIService) { }


  ngOnInit() { }
  openPopup() {
    this._apiService.serviceComp2().subscribe();
  }
}



