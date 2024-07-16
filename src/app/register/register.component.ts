import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

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
  constructor(private fb:FormBuilder,private toastr:ToastrService,private api:ApiService,private router:Router){} 

  //reactive formil , form valid/invalid enn test cheyyan...bcz formgrup property can cntrl form. athinte valid enna proprty test cheythal mathi
  register(){
    if(this.registerForm.valid){
        //api call
        const username = this.registerForm.value.username
        const email = this.registerForm.value.email
        const password = this.registerForm.value.password
        const user = {username,email,password}
        this.api.registerAPI(user).subscribe({
          next:(result:any)=>{
            //register successful
            this.toastr.success(`${result.username} has successfully registered!!!`)
            this.registerForm.reset()
            this.router.navigateByUrl('/login')
          },
          error:(reason:any)=>{
            this.toastr.warning(reason.error);
          }
        })
     }else{
          this.toastr.info("Invalid form!!!")
     }
  }
}
//model driven formatil 2 way binding cheyyanayittanu ithokke.