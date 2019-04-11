import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {

  username:String='';
  constructor(private userService:UserService, private router:Router) {
    this.userService.getCandidat()
    .subscribe(
      data=>this.addName(data),
      error=>this.router.navigate(['/login'])
    )
   }
   addName(data){
    this.username = data.username;
  }
  ngOnInit() {
  }
  logout(){
    this.userService.logout()
    .subscribe(
      data=>{console.log(data);this.router.navigate(['/login'])},
      error=>console.error(error)
    )
  }

}
