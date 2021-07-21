import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/Dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../service/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  animations: [
    visibility(),
    flyInOut(),
    expand(),
  ]
})
export class DishDetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  visibility = 'shown';
  next: string;
  errMess : string;
  dishcopy : Dish;
  commentForm: FormGroup;
  @ViewChild('fform') commentFormDirective: any;
  constructor(
    private dishService: DishService,
    private router: ActivatedRoute,
    private location: Location,
    public fb: FormBuilder
  ) {
    this.createForm();
  }
  ngOnInit(): void {

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.router.params
      .pipe(
        switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); })
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';

      }, errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId : string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1 )%this.dishIds.length];
    this.next= this.dishIds[(this.dishIds.length + index + 1 )%this.dishIds.length];
  }


  goBack(): void {
    this.location.back();
  }
  formErrors: { [key: string]: any } = {
    author: '',
    comment: '',
    rating: '',
  };

  validationMessages: { [key: string]: any } = {
    author: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters long.'
    },
    comment: {
      required: 'Comment is required.'
    },
  };
  createForm() {
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ],
      comment: [
        '',
        [
          Validators.required
        ],
      ],
      rating: [5],
    });
    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set validation messages now
    console.log(this.commentForm);
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    let now = new Date();
    let comment = this.commentForm.value;
    comment['date'] = now.toISOString();
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
    this.dish.comments.push(comment);
  }
}
