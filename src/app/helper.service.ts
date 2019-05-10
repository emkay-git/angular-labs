import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Name {
  'id': string; 'name': string; 'time': string;
}
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _http: HttpClient) { }
  private _responseArray: Name[] = [];


  public getDummyData() {
    return this._http.get<Name>('../assets/res.json').pipe(
      tap((data) => {
        data['time'] = new Date().toLocaleTimeString();
        this._responseArray.push(data);
      })
    );
  }

  get responseArray(): Name[] {
    return this._responseArray;
  }
}
