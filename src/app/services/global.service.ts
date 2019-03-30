import { Injectable } from "@angular/core";

@Injectable()
export class GlobalService {
    requestCount = 0;
    constructor() { }

    incrementCounter() {
        this.requestCount += 1;
    }

}
