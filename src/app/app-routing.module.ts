import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './homepage/profile/profile.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { AddOrderComponent } from './dashboard/add-order/add-order.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-order',
    canActivate: [AuthGuard],
    component: AddOrderComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
