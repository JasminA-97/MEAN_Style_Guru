import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  coupenStatus:boolean = false
  allProducts:any = []
  cartTotalPrice:number = 0
  coupenClickedStatus:boolean = false

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCartItems()
    }
  }

  getCoupen(){
    this.coupenStatus=true
  }

  backToOffers(){
    this.coupenStatus=false
  }

  coupen5percent(){
    this.coupenClickedStatus=true
    let discount  = Math.ceil(this.cartTotalPrice*.05)
    this.cartTotalPrice -= discount
  }
  coupen20percent(){
    this.coupenClickedStatus=true
    let discount  = Math.ceil(this.cartTotalPrice*.2)
    this.cartTotalPrice -= discount
  }
  coupen50percent(){
    this.coupenClickedStatus=true
    let discount  = Math.ceil(this.cartTotalPrice*.5)
    this.cartTotalPrice -= discount
  }

  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.cartTotalPrice))
    this.router.navigateByUrl("/checkout")
  }

  getCartItems(){
    this.api.getCartAPI().subscribe((res:any)=>{
      this.allProducts = res
      this.getCartTotalPrice()
    })
  }

  getCartTotalPrice(){
    this.cartTotalPrice = Math.ceil(this.allProducts.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
  }

  removeItem(id:any){
    this.api.removeCartAPI(id).subscribe((res:any)=>{
      this.getCartItems()
      this.api.getCartCount()
    })
  }

  incrementQuantity(id:any){
    this.api.incrementCartAPI(id).subscribe((res:any)=>{
      this.getCartItems()
    })
  }

  decrementQuantity(id:any){
    this.api.decrementCartAPI(id).subscribe((res:any)=>{
      this.getCartItems()
      this.api.getCartCount()//count can vary while decrement
    })
  }

  emptyCart(){
    this.api.emptyCartAPI().subscribe((res:any)=>{
      this.getCartItems()
      this.api.getCartCount() //count can vary while decrement
    })
  }
}
