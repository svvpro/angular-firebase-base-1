import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../items.service';
import {Item} from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;


  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  delete(item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  edit(item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  update(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

}
