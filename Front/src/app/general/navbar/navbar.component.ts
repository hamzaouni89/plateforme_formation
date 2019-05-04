import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
token : any;
  constructor(public userService : UserService, public router: Router) { 
    this.token = userService.getToken();
  }

  ngOnInit() {
    this.token = this.userService.getToken()
  }

  logout(){
    localStorage.removeItem("token");  
    this.router.navigateByUrl('/general/login');
    location.reload();
  }

}
