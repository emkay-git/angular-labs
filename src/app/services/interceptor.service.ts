import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;
    console.log(req);
    return next.handle(req)
      .pipe(
        tap(
          event => { ok = event instanceof HttpResponse ? 'succeeded' : ''; console.log(event); return { 'ok': 'ok' }; },
          error => ok = 'failed'
        ),
        finalize(() => {
          console.log(ok, event);
        })
      );
  }

}
