import { Injectable } from "@angular/core";

@Injectable()
export class PopupService {
    constructor() { }

    openModa: boolean = false;

    openModal(template) {
        this.openModal = true;
    }

    closeModal() {
        this.openModal = false;
    }

}
