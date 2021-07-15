import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../shared/Dish';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  @Input() dish: Dish;
  constructor() { }

  ngOnInit(): void {
  }

}
