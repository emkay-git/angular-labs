import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  constructor(private apiService: APIService) { }

  ngOnInit() { }

  openPopup() {
    this.apiService.serviceComp1().pipe(
      mergeMap(_ => this.apiService.service2Comp1())
    ).subscribe((data) => console.log(data));

  }

}
