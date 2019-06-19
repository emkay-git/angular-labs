import { Component, OnInit } from '@angular/core';
import { Subject, from, of } from 'rxjs';
import { distinctUntilChanged, debounceTime, mergeMap, filter, toArray, tap, auditTime, throttleTime, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {

  private wordSubject = new Subject<string>();

  allWords = [
    'Redesignate', 'unenforcedly', 'meleager',
    'traumatism', 'apriority', 'conveyorized', 'plagiocephaly',
    'epitheliums', 'inspirationally', 'potus', 'canter', 'vanish',
    'severest', 'carburetion.', 'Dogedom', 'brabant', 'conterminous', 'billie',
    'musicale', 'subpredicate', 'condit', 'divagated', 'battue', 'unmollifiable',
    'painter', 'libby', 'sinarquist', 'teazelled.', 'Pauling', 'discounter', 'aperiodically',
    'cummer', 'unenjoyed', 'nutbrown', 'grizzly', 'colossus', 'seato', 'unthrowable',
    'comeatable', 'unicameral', 'undisheartened', 'lesseps.', 'Unvindictive', 'footloose',
    'granitized', 'unsuccessfulness', 'overgratified', 'inquiline', 'desiderii', 'leukoblastic',
    'matt', 'pancreatotomy', 'nowadays', 'feelingful', 'endosporous', 'pwt.', 'Enviousness', 'kasai',
    'dissimilating', 'absterging', 'expletively', 'immigrate', 'poliatas', 'unwesternized', 'steak',
    'raffishness', 'devastative', 'fugitively', 'nutrient', 'subrhombic'
  ];

  showWords = [];


  constructor() { }

  ngOnInit() {
    this.showWords = this.allWords;
    let wordSubject$ = this.wordSubject.asObservable();

    wordSubject$.pipe(
      auditTime(2000),
      distinctUntilChanged(),
      tap(keyword => console.log(keyword)),
      mergeMap(keyword => from(this.allWords).pipe(
        filter(word => word.includes(keyword)),
        toArray()
      ))
    ).subscribe(data => this.showWords = data);

  }

  searchRelatedWords(word) {
    this.wordSubject.next(word);
  }

}
