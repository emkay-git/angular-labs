# AngularLabs

Angular Labs will contain small angular projects which can include, testing out angular features, deep digging in angular apis or small POC may be on different front end features which can be implemented in Angular way.

Each Lab will be a seperate branch on git. To access a Lab, you need to switch to that branch using `git checkout <branch_name>.

### Lab 6 - Observables and Subjects in RxJS

#### Observables are Unicast.
It means all the subscribers will have the independent execution of observable.


#### Subjects are multicast.
It means observable execution are shared among multiple subscribers.

When we call subscribe method on observable, it executes the next method for all observers subscribed to it independtly, when we call subscribe method on the subject, it registers that observer.


Subject can act as both data consumer and data producer. Data producer is same as observable, except that it's multicast. Data consumer can be thought of taking an observable and converting them to unicast.

Remember, observable doesn't have a next, error, complete method. It's observer which has these method.

Observable is we can susbcribe to. It has subscribe method which is response for registering the observer. So subscribe method will take observer only.


#### Pure Subject
late subscribers — i.e. those that subscribe after an error or complete notification has occurred — receive the error or complete notification.


#### Behaviour Subject 
Every subscriber will always get the initial or the last value that the subject emits.

#### Async Subject


#### Replay Subject
