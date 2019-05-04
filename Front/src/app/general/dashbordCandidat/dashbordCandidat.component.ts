import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbordCandidat',
  templateUrl: './dashbordCandidat.component.html',
  styleUrls: ['./dashbordCandidat.component.css']
})
export class DashbordCandidatComponent implements OnInit {
  token : String;
  user ;
  onchange = false;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.token = this.userService.getToken();
    this.userService.connectedUser = this.userService.getDecodedToken();
    this.user = this.userService.connectedUser;
    console.log(this.user);
    
  }

  logout(){
    localStorage.removeItem("token");  
    this.router.navigateByUrl('/general/login');
  }

  changeVal(){
    this.onchange = true;
  }
}
