# Shared Angular Modal

In the [previous]() article, I created a reusable Angular modal using bootstrap's modal. But one thing missing in the previous modal is, 
what if you want to use the modal from a service rather than binding to each component's template. How can you control the modal using a service? That's gonna be the outline of this article.

<img src="./blur-bowl-child-1549043.jpg"/>
<p style="text-align:center">
Photo by rawpixel.com from Pexels
</p>

### Use cases

Reusable Angular modal can be used wherever you want to have one modal for each component. But sometimes it's useful to have a centralized mechanism for showing all the popups. For example, you may have an API service in angular which holds all the requests to your APIs. If any of the API returns error response  of 4XX type, you can have a centralized mechanism to display that error rather than having a modal bound to each component's angular template.
So shared modal can be of great use here. This use case is shown in the demo for you to get the essence in what other situations this approach can be used. Let's see how easily it can be made and used from our own [Reusable Angular modal]().

### Last thing First

This is how our modal is gonna look.
<img src="./modal.gif"/>
<p style="text-align:center">
Shared Angular Modal
</p>

This demo mimics a real case scenario where multiple components may call API endpoints. If API throws some error, it can be handled at a centralized location. Also, display some error message using our modal for user to give some feedback. 

### Design

Shared modal is built on top of our previous [reusable Angular Modal](). Only addition to the previous modal design is the popup.service. This service is responsible for 
making a reusable angular modal, shared among multiple components.

The shared modal has a queue based design as shown below. Don't be bewildered by the arrows. We will go through it sequentially as shown in diagram explaining how it works.
<img src="./shared-popup.png"/>
<p style="text-align:center">
Shared Angular Modal design and flow.
</p>

1. A component may open or close the modal. Component opens the modal using the service's openPopup function and gets the observable in return which component can listen to. This observable emits the data based on which button of the modal is clicked. User can perform certain action based on the button clicked.
2. Service checks if the queue is empty or not. If the queue is empty it means no popup is already opened. Hence, service opens the popup based on the info provided by the component.
3. This request is added in the queue. It's necessary so that any other component opening the popup doesn't override the data in the already opened popup.
4. Now component may get the intimation from the observable it received about what button is clicked. It may choose to close the popup. Let's say component closes it.
5. The request is removed from the queue and observable is made complete so that no more data can be received.
6. If there is any pending request for opening modal. That is opened and added in the queue and cycle starts again.

Read ahead to see how this design is implemented.

### Code Development

In terms of code development, all our code from the previous article will be there. However, there is an addition of the service class which makes it shareable among multiple
components. 

Just like the previous approach, we will dwell into the code comments and see how all it works.

As before if you are an impatient soul, here is the [stackblitz](https://stackblitz.com/github/emkay-git/angular-labs/tree/lab7?file=src%2Fapp%2Freusable-popup%2Freusable-popup.component.ts). It shows the demo shown above. You will find a few details there as well in comments but to know more on <b>WHYs?  HOWs?</b> come back here.

<em><b>popup.service.ts</b></em>

```javascript
@Injectable()
export class PopupService {

    /**
     * FIrstly, service should have all the parameters which are @Input properties of popup commponent. They are
     * - @Input() showPopup
     * - @Input() popupBody
     * - @Input() buttonConfig
     * - @Input() title
     * So these are mapped below as follows
     */

    // Maps to @Input showPopup
    isPopupVisible: boolean = false;

    // Maps to @Input popupBody
    body: TemplateRef < any > ;

    // Maps to @Input buttonConfig
    buttonConfig: ButtonConfig = {
        'button1': {
            'buttonName': 'Test Button',
            'buttonType': 'test'
        }
    };

    // Maps to @Input title
    title: string;

    /**
     * Whenever a client uses this service to open a modal, instead of opening the modal directly,
     * request is pushed in a data structure, here, _popupRequest array. It's necessary because it may happen
     * that two different clients may call to open modal, the second request for opening modal will simply override the
     * content of the first modal call. With caching, both the request will be put in _popupRequest. Always the
     * first request in the array will be processed and only after the first modal has been closed, the second request will be
     * processed hence mitigating the risk of content being overwritten.
     */
    private _popupRequest: any[] = [];

    /**
     * This method is responsible for showing the modal popup.
     * If you see, the return type is Observable. It's because every client which uses the popup service to open the modal
     * is returned an observable to which it can listen to. Why clients need it you ask? Basically when a user clicks
     * on any of the modal button then that intimation will be sent through subject only and client can listen to it.
     */
    showPopup(body: TemplateRef < any > , buttonConfig: ButtonConfig): Observable < any > {

        // Creating a new subject so that it can be returned as an observable to the client. 
        // Client will be notified whenever a button is clicked.
        const popupSubject = new Subject();

        // If there are no pending request in the queue, directly open the current Popup request
        if (this._popupRequest.length == 0) {
            this.openCurrentPopup(body, buttonConfig);
        }

        // Push it in the _popupRequest queue, so when another request is made by the client, service is aware there is still
        // popup request which hasn't been finished yet. Information is saved in the queue are body, buttonConfig, and subject
        this._popupRequest.push({
            'body': body,
            'buttonConfig': buttonConfig,
            'subject': popupSubject
        });

        // Returns subject as observable to the client.
        return popupSubject.asObservable();
    }

    /** 
     * This function ultimately opens the popup, it does so by binding all the @Input properties of the popup component
     * with the values provided by the client, and finally making isPopupVisible to true.
     */
    private openCurrentPopup(body, buttonConfig) {
        this.buttonConfig = buttonConfig;
        this.body = body;
        this.isPopupVisible = true;
    }

    /** If you remember from the reusable modal component there is one event emitter as well
     * @Output() popup-events. This functions simply delegates the task of sending event from popup component 
     * to the client via subject we defined earlier for every client. 
     */
    popupEvent(event) {
        /** It only sends events other than POPUP_CLOSED_AFTER_TRANSITION. This event is used internally by the service to open the next popup in sequence.
         * More on it below. */
        if (event == 'POPUP_CLOSED_AFTER_TRANSITION') {

            this.openNextPopup();

        } else {
            // Any event emitted is simply emitted via subject to the client.
            this._popupRequest[0]['subject'].next(event);
        }
    }

    /**
     * This function closes the popup when requested by a client. It does two thing
     * 1) make the @Input property showPopup false of the popup component
     * 2) completes the subject as when the popup is closed, a client doesn't expect any other 
     * event emitted to it. Also, it prevents any hanging observable.
     */
    closePopup() {
        this.isPopupVisible = false;
        this._popupRequest[0]['subject'].complete();
    }

    /**
     * Let's be clear about the flow of how popup works once again. Client request for opening the modal using showPopup() function.
     * Internally openCurrentPopup is used to open the modal.
     * When the Popup has been opened, any button which is clicked in the popup, intimation is sent to the client through a subject in
     * popupEvent() function. Client request for closing of popup using the closePopup service. And when the popup is ultimately closed
     * POPUP_CLOSED_AFTER_TRANSITION event is triggered. When this event is triggered openNextPopup() function is called which sees
     * if there are any other popupRequest and start over the process.
     */

    /**
     * This method is called whenever POPUP_CLOSED_AFTER_TRANSITION is called. POPUP_CLOSED_AFTER_TRANSITION event indicates
     * that popup has been closed. So this method checks if there are any other popup request in sequence in the _popupRequest
     * array after it has removed the first element. If there is any more request, this method opens it.
     */
    private openNextPopup() {
        this._popupRequest = this._popupRequest.slice(1);
        if (this._popupRequest.length > 0) {
            this.openCurrentPopup(this._popupRequest[0].body, this._popupRequest[0].buttonConfig);
        }
    }

}
```

### Wrap up

That's all it takes to create a nice modal which can be reused within your components. It's not the
most sophisticated version of modal I could come up with, but it's built the right amount. 
You can play with it on the [stackblitz](https://stackblitz.com/github/emkay-git/angular-labs/tree/lab7?file=src%2Fapp%2Freusable-popup%2Freusable-popup.component.ts). Source code is [here](https://github.com/emkay-git/angular-labs/tree/lab7).
Modal animation has yet to be fixed. So if you would like to contribute that is one thing you can add or any other stuff you think
will be interesting.

 

