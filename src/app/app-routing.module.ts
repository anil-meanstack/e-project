import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductComponent } from './product/product.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  { path: "", component: ProductComponent },
  { path: "userSignup", component: UserSignupComponent },
  { path: "login", component: UserLoginComponent },
  { path: "product-view", component: ViewProductComponent },
  { path: "product-view/:id", component: ViewProductComponent },
  { path: "addtocart", component: AddtocartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "my-order", component: MyOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
