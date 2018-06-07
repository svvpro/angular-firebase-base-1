import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Item} from './item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ItemsService {

  itemsCollection: AngularFirestoreCollection<Item>;
  itemDocument: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));
    // this.items = this.itemsCollection.valueChanges();
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  updateItem(item: Item) {
    this.itemDocument = this.afs.doc(`items/${item.id}`);
    this.itemDocument.update(item);
  }

  deleteItem(item: Item) {
    this.itemDocument = this.afs.doc(`items/${item.id}`);
    this.itemDocument.delete();
  }
}
