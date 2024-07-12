import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
//register form enna property undakkanamenkil ee formbuilder nu akathulla group enna methd call cheyyanam. its arg  which is obj, ithilanu form array, to store values(initialised with empty string)
  registerForm = this.fb.group({
    username :['',[Validators.pattern('[a-zA-Z ]*'),Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*'),Validators.required]]
  })
  // property of form builder cls is injected to fb for creating formGroup 
  constructor(private fb:FormBuilder,private toastr:ToastrService){} 


  //reactive formil , form valid/invalid enn test cheyyan...bcz formgrup property can cntrl form. athinte valid enna proprty test cheythal mathi
  register(){
    if(this.registerForm.valid){
      //api call
      alert("inside register fn")
    }else{
      this.toastr.info("invalid form")
    }
  }
}
//model driven formatil 2 way binding cheyyanayittanu ithokke.