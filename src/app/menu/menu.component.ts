import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../service/dish.service';
import { flyInOut , expand} from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true', 
    'style': 'display: block',
  },
  animations: [
    flyInOut(),
    expand(),

  ]
})
export class MenuComponent implements OnInit {
  constructor(private dishService: DishService, @Inject('baseURL') private baseURL) {
    console.log(baseURL);
    
   }

  ngOnInit() {
    // this.dishService.getDishes()
    // .then(dishes => this.dishes = dishes);
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);

  }
  dishes: Dish[];
  selectedDish: Dish = {
    id: "0",
    name: 'Uthappizza',
    image: '/assets/images/uthappizza.png',
    category: 'mains',
    featured: true,
    label: 'Hot',
    price: '4.99',
    // tslint:disable-next-line:max-line-length
    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    comments: [
      {
        rating: 5,
        comment: 'Imagine all the eatables, living in conFusion!',
        author: 'John Lemon',
        date: '2012-10-16T17:57:28.556094Z'
      },
      {
        rating: 4,
        comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
        author: 'Paul McVites',
        date: '2014-09-05T17:57:28.556094Z'
      },
      {
        rating: 3,
        comment: 'Eat it, just eat it!',
        author: 'Michael Jaikishan',
        date: '2015-02-13T17:57:28.556094Z'
      },
      {
        rating: 4,
        comment: 'Ultimate, Reaching for the stars!',
        author: 'Ringo Starry',
        date: '2013-12-02T17:57:28.556094Z'
      },
      {
        rating: 2,
        comment: 'It\'s your birthday, we\'re gonna party!',
        author: '25 Cent',
        date: '2011-12-02T17:57:28.556094Z'
      }
    ]
  };
  onSelect(dish: Dish) {
    this.selectedDish = dish;
    // alert(dish.name);
  }

}
