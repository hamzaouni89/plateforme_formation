import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private router:Router, private userService :UserService) { }

  ngOnInit() {
  }
  moveToRegister(){
    this.router.navigate(['/register']);
  }

  // login(){
  //   if(!this.loginForm.valid){
  //     console.log('Invalid');
  //   }else{
  //     this.userService.loginUser(this.loginForm.value)
  //     .subscribe(
  //       data=>{console.log(data);this.router.navigate(['/dashbordCandidat/profilCandidat']);} ,
  //     )
  //   }
  // }

  login(user) {

    this.userService.loginUser(user).subscribe((res: any) => {
      console.log(res)
      if (res.Message === "authentification valide") {
        localStorage.setItem('token', res.token);
        this.userService.connectedUser = this.userService.getDecodedToken();
        console.log( this.userService.connectedUser);
        if (this.userService.connectedUser.role == "Candidat")
        {
          this.router.navigate(['/dashbordCandidat/profilCandidat']);
        }
        else if (this.userService.connectedUser.role == "Coach")
        {
          this.router.navigate(['/dashbordCoach/cours']);
        }
        else if(this.userService.connectedUser.role == "Admin")
        {
          this.router.navigate(['/dashbordAdmin/coach']);
        }
        

      }
      else {
        console.log("user invalide");
      }
    });
  }
}
