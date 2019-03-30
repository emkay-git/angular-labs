import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

/**
 * It's a simple HTTP console logger interceptor. We can design advanced logger to write to a file or send request to servers.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerInterceptor implements HttpInterceptor {


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;
    const started = Date.now();
    return next.handle(req)
      .pipe(
        tap(
          event => { ok = event instanceof HttpResponse ? 'succeeded' : ''; },
          error => ok = 'failed'
        ),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.log(msg);
        })
      );
  }

}
