import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
