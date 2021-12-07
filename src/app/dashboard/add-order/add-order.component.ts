import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  categories = [ 'Category 1', 'Category 2', 'Category 3' ];
  orderForm: FormGroup;
  isSubmited = false;
  ordersCount: number;

  readonly pricePlaceholder = 'Price';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();

    this.ordersCount = +localStorage.getItem('ordersCount');
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.orderForm.invalid) {
      return;
    }

    const order = this.orderForm.value as Order;
    console.log(order);
  }

  private buildForm() {
    this.orderForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      category: [ '', Validators.required ],
      price: [ null, Validators.compose([Validators.required, Validators.min(0)]) ]
    });
  }
}
