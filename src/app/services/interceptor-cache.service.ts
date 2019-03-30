import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, startWith } from 'rxjs/operators';

/**
 * Caching the Http Request Response
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    cache = new Map<string, HttpResponse<any>>();

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isCachable(req)) {
            next.handle(req);
        }
        const cache = this.getCahchedData(req);

        /** Login for cache then refresh */
        if (req.headers.get('x-refresh')) {
            const newData$ = this.sendRequest(req, next);

            if (!cache) { return newData$; } else {
                return newData$.pipe(startWith(cache));
            }
        }

        return cache ? of(cache) : this.sendRequest(req, next);
    }

    /**
     * A request is cachable only if it's GET.
     * @param req - Http Request made
     */
    public isCachable(req: HttpRequest<any>) {
        if (req.method === 'get') { return true; }
        return false;
    }

    /**
     * Get the data from map.
     * @param req - Http Request made
     */
    public getCahchedData(req: HttpRequest<any>) {
        return this.cache.get(req.url);
    }

    /**
     * Sending request to backend.
     * @param req - HttpRequest
     * @param next - Http Handler
     */
    public sendRequest(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap(
                (response) => {
                    if (response instanceof HttpResponse) {
                        this.saveInCache(req, response);
                    }
                }
            )
        );

    }

    /**
     * Save in map.
     */
    saveInCache(req, response) {
        console.log(this.cache);
        this.cache.set(req.url, response);
    }


}

