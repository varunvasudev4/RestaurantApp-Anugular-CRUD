import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!: FormGroup
  restaurantModelObj:RestaurantData=new RestaurantData()
  allRestaurantData:any
  constructor(private fb: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  addRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      alert('Restaurant Record added Successfully')
      this.formValue.reset()
    },
    err=>{
      alert('Somthing went wrong try again')
    })
    this.getAllData()
  }
  
  //Get All data
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res;
    })
  }

  //Delete data
  deleteRestaurant(id:any){
    this.api.deleteRestaurant(id).subscribe(res=>{
      alert("Deleted Successfully")
      this.getAllData();
    })
  }

  //Update Restaurent
  updateGet(restaurant:any){
    this.restaurantModelObj.id = restaurant.id
    this.formValue.controls['name'].setValue(restaurant.name)
    this.formValue.controls['email'].setValue(restaurant.email)
    this.formValue.controls['mobile'].setValue(restaurant.mobile)
    this.formValue.controls['address'].setValue(restaurant.address)
    this.formValue.controls['services'].setValue(restaurant.services)
  }
  updateRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;
    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
      alert("Updated Successfully")
      this.getAllData();
  })
  }

}