import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //oru component le value nu varunna changes immediately veroru component nu kittanamenkil, we can pass it as a BehaviorSubject
  //service il create cheythal pala component num use cheyyam.
  //create obj of class BehaviourSubject with an initial value.
  //BehaviorSubject lekk value update cheyyan next() method.
  //BehaviorSubject nte value ethenkilum component nu get cheyyan, subscribe the BehaviorSubject.

  searchKey = new BehaviorSubject("")
  cartCount = new BehaviorSubject(0)
  wishlistCount = new BehaviorSubject(0) //then define getWishlistCount() to assign value to BehaviourSubject

  server_url = "https://mean-style-guru-server.onrender.com"

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  getAllproductsAPI(){
    return this.http.get(`${this.server_url}/all-products`)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/view-product`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  //append token to http header
  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI(product:any){
    return this.http.post(`${this.server_url}/addToWishlist`,product,this.appendToken())
  }

  //get wishlist
  getWishlistAPI(){
    return this.http.get(`${this.server_url}/get-wishlist`,this.appendToken())
  }

  //get wishlist call cheyyumbo kittunna array length eduthal mathi, count kittum
  getWishlistCount(){
    this.getWishlistAPI().subscribe((result:any)=>{
      this.wishlistCount.next(result.length)
    })
  }

  // removeWishlist
  removeWishlistAPI(id:any){
    return this.http.delete(`${this.server_url}/wishlist/${id}/remove`,this.appendToken())
  }

  //addToCart
  addToCartAPI(product:any){
    return this.http.post(`${this.server_url}/addToCart`,product,this.appendToken())
  }

    //get cart
    getCartAPI(){
      return this.http.get(`${this.server_url}/get-cart`,this.appendToken())
    }

    getCartCount(){
      this.getCartAPI().subscribe((result:any)=>{
        this.cartCount.next(result.length)
      })
    }

    // remove cart
    removeCartAPI(id:any){
      return this.http.delete(`${this.server_url}/cart/${id}/remove`,this.appendToken())
    }
    
    //incrementcart
    incrementCartAPI(id:any){
      return this.http.get(`${this.server_url}/cart/${id}/increment`,this.appendToken())
    }
    
    //decrementcart
    decrementCartAPI(id:any){
      return this.http.get(`${this.server_url}/cart/${id}/decrement`,this.appendToken())
    }
    
    //emptycart
    emptyCartAPI(){
      return this.http.delete(`${this.server_url}/empty-cart`,this.appendToken())
    }

}
