import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../shared/Dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../service/dish.service';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  constructor(private dishService: DishService, private router: ActivatedRoute, private location: Location) { }
  ngOnInit(): void {
    console.log("okokok");
    
    let id = this.router.snapshot.params['id'];
    this.dishService.getDish(id).subscribe((dish) => {
      console.log(dish);
      this.dish = dish});
    }

    goBack(): void {
      this.location.back();
    }
}
