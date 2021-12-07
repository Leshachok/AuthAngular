import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/core/api/orders.service';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-orders',
  templateUrl: './ngx-orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  isLoading = false;

  constructor(private ordersService: OrdersService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.isLoading = true;

    forkJoin(
      this.ordersService.getOrders()
    ).subscribe(([orders, userName]) => {
      this.orders = orders;
      this.isLoading = false;

      this.loadingService.setLoadingState(false);

      console.log('Orders:', orders);
    });
  }
}
