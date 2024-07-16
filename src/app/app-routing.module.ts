import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  //:4200/
  {path:"", component:HomeComponent},
  //:4200/register
  {path:'register', component:RegisterComponent},
  //:4200/login
  {path:'login',component:LoginComponent},
  //:4200/10/view
  {path:':id/view', component:ViewComponent},
  //:4200/wishlist
  {path:'wishlist',canActivate:[authGuard], component:WishlistComponent},
  //:4200/cart
  {path:'cart',canActivate:[authGuard], component:CartComponent},
  //:4200/checkout
  {path:'checkout',canActivate:[authGuard], component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
