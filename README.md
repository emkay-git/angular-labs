# Resuable Angular Modal
In this post, I will turn a bootstrap modal into an Angular modal. So let's get started.

<img src="./erda-estremera-581452-unsplash.jpg"/>
<p style="text-align:center">
Photo by Erda Estremera on Unsplash
</p>

### Use cases

Well modals/popups are used for various reasons like the following:- 

* Showing details about something
* Showing error or success from the API 
* Taking input from user in a form. And many more... 

Hence there are enough reasons that you will definitely use a modal in your application.
There are many modal availabe such as <a href="https://ng-bootstrap.github.io/#/components/modal/examples" target="_blank">ng-bootsrap</a>, but creating your own gives more control on the behaviour as well as look and feel of the modal.

### Last thing First

This is how our modal is gonna look.
<img src="./modal.gif"/>
<p style="text-align:center">
Bootstrap turned Angular Modal
</p>

This modal will have features like customizable title name, supports two buttons with customizable name and customizable html template you can show as modal's body.

It has used concepts in Angular such as <em>Data binding, Two way data binding, dynamic template loading etc</em> So let's start building it.

### The setup

* Create an angular project and inside it a component using cli as <code>$ ng g c popup</code>. It will create an <b>app-popup</b> component.
* Next, we need to setup bootstrap inorder to leverage bootstrap's modal. Since it's dependent on jquery we need to install jquery as well. Follow these steps:-

  * Install jquery and bootstrap modules using npm as <code>$ npm install bootstrap jquery --save</code>
  * Install type definition for jquery and bootstrap as <code>$ npm install @types/bootstrap @types/jquery --save</code>
  * Add bootstrap.min.css, bootstrap.min.js and jquery.js in angular.json file. 
   

```javascript
            "styles": [
                "src/styles.css",
                "./node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
                "./node_modules/jquery/dist/jquery.js",
                "./node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
```

jquery.js should be first then bootstrap.min.js

### Code Development

Instead of going through the small snippets of my code one by one, I have provided below all the code which is highly commented code, you can
read along and see how it's working.

Okay if you are already impatient and want to play with it, here is the [stackblitz](https://stackblitz.com/github/emkay-git/angular-labs/tree/lab7?file=src%2Fapp%2Freusable-popup%2Freusable-popup.component.ts). You will find few details there as well in comments but to know more on <b>WHYs?  HOWs?</b> come back here.

Let's see first our component file where all the logic resides. I have removed the imports for brevity.

<em><b>popup.component.ts</b></em>

```javascript
/** Below are two interfaces defined for modal's buttons, we will see the use case below */
export interface ButtonConfig {
    button1: Button;
    button2 ? : Button;
}

/** Button is the interface for a modal button, it has button name and button type, button 
 * type can be thought of action that button is performing for example, close, okay etc.
 */
interface Button {
    buttonType: string;
    buttonName: string;
}

/**
 * I have made a very lousy attemt to create animation of fade in and fade out similar to 
 * what we see in bootstrap modal. Although it's far from it, but acceptable.
 */
@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css'],
    animations: [
        trigger('modalAnimate', [
            state('close', style({
                top: '-100%',
                opacity: 0
            })),
            state('open', style({
                top: '5%',
                opacity: 1
            })),
            transition('close => open , open => close', [
                animate('300ms 300ms ease')
            ])
        ])
    ]
})
export class PopupComponent implements OnInit, OnChanges, AfterViewInit {

    /** Below is the list of inputs and outputs binding for this popup component. 
     * Let's see what each of them are.
     */

    /***************************************************************************************************/

    /** title - modal title as string */
    @Input() title: string;

    /** popupBody - modal body, the body here is taken as TemplateRef<> and not string. 
     * Because using template ref will then allow to load content dynamically. 
     * It can be any html template one would like to show in the modal's body.
     */
    @Input('popupBody') body: TemplateRef < any > ;

    /** buttonConfig - modal buttons. They are of type ButtonConfig as defined above */
    @Input() buttonConfig: ButtonConfig;

    /** Now this is what controls opening and closing of the modal */
    @Input() showPopup: boolean = false;

    /** Events emitted by modal. It will be discussed down below. */
    @Output('popup-events') popupEvents: EventEmitter < any > = new EventEmitter < any > ();

    /***************************************************************************************************/

    /**
     * vc - It represnts the element in the html in which our popup body template will be dynamically
     * loaded. 
     */
    @ViewChild('body', {
        read: ViewContainerRef
    }) vc: ViewContainerRef;

    /** Now in jquery reference to modal can be done using id like jQuery('#id'). But having a single 
     *  modal id will create problem. Why you ask? Because when you refer the modal as jQuery('#mdoalId'),
     *  if modal id is same for differnt popup components any operation on the popup will refer to the 
     *  same modal and that will create all the problem. So for each modal which is created by angular,
     *  it should have a unique modal.
     */
    modalId: string = '';

    constructor() {}
    // Called once.
    ngOnInit() {

        //Checking if user gave the modal title if yes, use it. Else go to the default title.
        this.title = this.title && this.title.length > 0 ? this.title : 'Default Title';

        /** Each modal should hahve a unique Id for it to work as discussed above. 
         *  Here generating a random string. Since ngOnInit() is called only once, it will be fixed for 
         *  one popup component rendered by Angular.
         */
        this.modalId = 'a' + Math.random().toString(35).substring(7);

        /** In case user has not given any button configuration there are two buttons set by default. */
        if (!(this.buttonConfig && Object.keys(this.buttonConfig).length > 0)) {
            this.buttonConfig = Object.assign({}, {
                'button1': {
                    'buttonName': 'Ok',
                    'buttonType': 'okay'
                },
                'button2': {
                    'buttonName': 'Close',
                    'buttonType': 'close'
                }
            });
        }
    }

    // Called everytime inputs changes.
    ngOnChanges() {
        // make sure modalId is initialized
        if (this.modalId) {

            // Now if showPopup changes ngOnChanges will be called.

            // If true
            if (this.showPopup) {

                // Ask User to provide atleast one button.
                if (!(this.buttonConfig && Object.keys(this.buttonConfig).length > 0)) {
                    throw new Error("Provide atleast one button");
                }

                /** This is where component dynamic loading occurs. Following are the steps executed
                 *  1) If container is not null and body is also present, clear the container first. 
                 *  This is essential because earlier if any other template might have been loaded, 
                 *  it will remove that.
                 *  2) Insert the current body template provided by the user.
                 *  3) Show the modal, here comes the jquery.
                 */
                if (this.vc && this.body) {
                    this.vc.clear();
                    this.vc.insert(this.body.createEmbeddedView(null));

                }
            }
            // If false
            else {

                /** 
                 * Event is emitted when modal has completed the close transition. One usecase can be 
                 * for cascading modala
                 **/
                this.popupEvents.emit('POPUP_CLOSED_AFTER_TRANSITION');
            }
        }
    }

    /**
     * So there are two types of events which are emitted by this popup. 
     * - First is buttonType - When any of the button as provided by user is emitted then on
     * the click of that button, corresponding buttonType is emitted. User on 
     * receiving the buttonType event in their component may perform anything,
     * closing the modal, calling some method whatever is the requirement.
     * - Other is 'POPUP_CLOSED_AFTER_TRANSITION' as described above.
     */
    closePopup(button ? : Button) {
        this.popupEvents.emit(button.buttonType);
    }

}
```

Now the template supporting the component. It's a standard bootstrap's modal code you can find online, only thing
augmented is the angular bindings. 

I eariler made use of jquery to open/close the modal from my ts file. But reading online I found
it's recommended to avoid using jQuery methods. So I had to create my own animation and add/remove classes, 
styles based on whether modal is shown or hidden. It's not very neat, but it's not wrong either. It works.

<em><b>popup.component.html</b></em>

```html
<!-- 
-->

<!-- 
    Following things are happening in first div of modal:-
    1) Modal Id is binded dynamically.
    2) Modal animation has been binded to value 'open' or 'close' state as defined in animation metadata.
    3) show class and display:block is added when modal is opened. show class is removed and style: none
       is added on modal close.
-->

<div [@modalAnimate]="this.showPopup ? 'open':'close'" class="modal fade {{this.showPopup?'show':''}}"
  [ngStyle]="{'display':!this.showPopup?'none':'block'}" [id]="modalId" tabindex="-1" data-backdrop="static"
  data-keyboard="false" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" [id]="modalId">{{title}}</h5>
      </div>
      <div class="modal-body">
        <!-- This is the container element referenced in our code, at this place popup template body is attached -->
        <ng-template #body></ng-template>
      </div>
      <div class="modal-footer">
        <!-- Button clicks emit events based on their buttonType value -->
        <button (click)="closePopup(buttonConfig.button1)" type="button"
          class="btn btn-secondary">{{buttonConfig.button1.buttonName}}</button>
        <button *ngIf="buttonConfig.button2" (click)="closePopup(buttonConfig.button2)" type="button"
          class="btn btn-primary">{{buttonConfig.button2.buttonName}}</button>
      </div>
    </div>
  </div>
</div>
<!-- This is for creating backdrop effect -->
<div *ngIf="this.showPopup" class="modal-backdrop fade show"></div>

```

### The End!

That's all it takes to create a nice modal which can be reused within your components. It's not the
most sophisticated version of modal I could come up with, but it's built the right amout. 
You can play with it on the [stackblitz](https://stackblitz.com/github/emkay-git/angular-labs/tree/lab7?file=src%2Fapp%2Freusable-popup%2Freusable-popup.component.ts). Source code is [here](https://github.com/emkay-git/angular-labs/tree/lab7).
Modal animation has yet to be fixed. So if you would like to contribute that is one thing you can add or any other stuff you think
will be interesting.

 

