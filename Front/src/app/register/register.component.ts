import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    nom:new FormControl(null,Validators.required),
    prenom:new FormControl(null,Validators.required),
    age:new FormControl(null,Validators.required),
    niveau:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  })
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
  }

  moveToLogin(){
    this.router.navigate(['/login']);
  }

  // register(){
  //   if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
  //     console.log('Invalid Form'); return;
  //   }

  //   this.userService.createCandidat(this.registerForm.value)
  //   .subscribe(
  //     data=> {console.log(data); this.router.navigate(['/login']);},
  //     error=>console.error(error)
  //   )
  //   // console.log(JSON.stringify(this.registerForm.value));
  // }

  register() {
    console.log(this.registerForm.value)
    this.userService.createCandidat(this.registerForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/login')
    });
  }


}
