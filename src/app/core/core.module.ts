import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OrdersService } from './api/orders.service';

@NgModule({
  declarations: [],
  imports: [ HttpClientModule ],
  providers: [
    OrdersService
  ]
})
export class CoreModule { }
