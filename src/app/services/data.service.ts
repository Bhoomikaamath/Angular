import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  dob: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Item[] = [];
  private itemsSubject = new BehaviorSubject<Item[]>(this.items);
  
  items$ = this.itemsSubject.asObservable();

  addItem(item: Item): void {
    this.items.push(item);
    this.itemsSubject.next(this.items);
  }

  updateItem(updatedItem: Item): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.itemsSubject.next(this.items);
    }
  }
}
