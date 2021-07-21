import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service';
import { LeaderService } from '../service/leader.service';
import { PromotionService } from '../service/promotion.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': "true", 
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish) => {this.dish = dish;});
    this.promotionservice.getFeaturedPromotion().subscribe((promotion) => {
      console.log("okok");
      this.promotion = promotion;});
    this.leader = this.leaderservice.getFeaturedLeader();
  }

}
