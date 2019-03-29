import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this._http.get('http://dummy.restapiexample.com/api/v1/employee/3').subscribe(data => {
      console.log(data);
    });
  }
}
