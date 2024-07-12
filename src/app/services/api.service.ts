import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllproductsAPI(){
    return this.http.get(`${this.server_url}/all-products`)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/view-product`)
  }

}
