import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //create restaurant by post
  postRestaurant(data:any){
    return this.http.post<any>("http://localhost:3000/restaurants",data).pipe(map((res:any)=>{
      return res

    }))
  }

  // get restaurant by get
  getRestaurant(){
    return this.http.get<any>("http://localhost:3000/restaurants").pipe(map((res:any)=>{
      return res
    }))
  }

  //update restuarant 
  updateRestaurant(data:any,id:any){
    return this.http.put<any>("http://localhost:3000/restaurants/"+id,data).pipe(map((res:any)=>{
      return res

    }))
  }

  //delete restaurant
  deleteRestaurant(id:any){
    return this.http.delete<any>("http://localhost:3000/restaurants/"+id).pipe(map((res:any)=>{
      return res
    }))
  } 

}
