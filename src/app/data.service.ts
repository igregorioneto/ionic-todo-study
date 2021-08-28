import { Injectable } from '@angular/core';
import { List } from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public save(list: List) {
    const data = JSON.stringify(list);
    localStorage.setItem('list', data);
  }

  public get(): List {
    const data = localStorage.getItem('list');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
}
