import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
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
  constructor(private router:Router, private userService : UserService) { }

  ngOnInit() {
  }
  moveToRegister(){
    this.router.navigate(['/register']);
  }

  login(user) {

    this.userService.loginUser(user).subscribe((res: any) => {
      if (res.Message === "authentification valide") {
        localStorage.setItem('token', res.token);
        this.userService.connectedUser = this.userService.getDecodedToken();
        console.log(this.userService.connectedUser);
        
        if (this.userService.connectedUser.role == "Candidat")
        {
          this.router.navigate(['/general/dashbordCandidat']);
        }
        else if (this.userService.connectedUser.role == "Coach")
        {
          this.router.navigate(['/general/dashbordCoach/cours']);
        }
        else if(this.userService.connectedUser.role == "Admin")
        {
          this.router.navigate(['/general/dashbordAdmin/coach']);
        }
      }
      else {
        console.log("user invalide");
      }
    });
  }

  
}
