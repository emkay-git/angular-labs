import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _http: HttpClient, private globalService: GlobalService) { }

  ngOnInit() {

  }

  makeAPICall(type: string) {
    if (type === 'get') {
      this._http.get('http://dummy.restapiexample.com/api/v1/employee/3').subscribe(data => {
        this.globalService.incrementCounter();
        console.log(data);
      });
    } else {
      this._http.post('http://dummy.restapiexample.com/api/v1/create', { "name": "test", "salary": "123", "age": "23" }).subscribe(data => {
        console.log(data);
      });
    }
  }
}
