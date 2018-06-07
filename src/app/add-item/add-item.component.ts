import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemsService} from '../items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
    title: '',
    description: ''
  };

  constructor(protected itemsService: ItemsService) {
  }

  ngOnInit() {
  }

  setItem() {
    if (this.item.title !== '' && this.item.description !== '') {
      this.itemsService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }

}
