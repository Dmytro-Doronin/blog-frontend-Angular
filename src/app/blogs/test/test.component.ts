import { Component } from '@angular/core';
import {Fruit} from "./interface";

@Component({
  selector: 'blog-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})


export class TestComponent {

fruits: Fruit[] = [
  { id: '1', name: 'apple', price: 10 },
  { id: '2', name: 'orange', price: 20 },
  { id: '3', name: 'watermelon', price: 30 },
  { id: '4', name: 'banana', price: 5 },
  { id: '5', name: 'pears', price: 12 },
  { id: '6', name: 'raspberries', price: 18 },
  { id: '7', name: 'avocados', price: 14 },
  { id: '8', name: 'mangoes', price: 3 },
  { id: '9', name: 'kiwifruit', price: 7 },
  ]
}

