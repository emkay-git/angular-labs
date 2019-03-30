import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalService } from "./global.service";

@Injectable()
export class RefresherInterceptor implements HttpInterceptor {

    constructor(private globalCounter: GlobalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.globalCounter.requestCount % 2 === 0) {
            const newReq = req.clone(
                { headers: req.headers.set('x-refresh', 'true') }
            );

            return next.handle(newReq);
        }
        return next.handle(req);
    }
}
