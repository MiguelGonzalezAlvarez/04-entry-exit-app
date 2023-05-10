import { Component, inject } from '@angular/core';
import { Item } from '@angular/fire/analytics';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'entryExitApp';

  items: Observable<Item[]>;

  constructor(private firestore: Firestore) {
    const itemCollection = collection(this.firestore, 'items');
    this.items = collectionData(itemCollection);
  }

}
