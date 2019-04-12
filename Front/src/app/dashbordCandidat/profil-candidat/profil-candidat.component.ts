import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {

  token : String;
  EditUser: FormGroup;
  user ;
  constructor(private userService:UserService, private router:Router) {
    this.EditUser = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      email: new FormControl(),
      tel: new FormControl(),
      age: new FormControl(),
      owner: new FormControl(),


    });
   }
  ngOnInit() {
    this.token = this.userService.getToken();
    this.userService.connectedUser = this.userService.getDecodedToken();
    this.user = this.userService.connectedUser;
  }
  logout(){
    localStorage.removeItem("token");  
    this.router.navigateByUrl('/login');
  }

  update(user) {
    this.EditUser = new FormGroup({
      nom: new FormControl(this.userService.connectedUser.nom),
      prenom: new FormControl(this.userService.connectedUser.prenom),
      email: new FormControl(this.userService.connectedUser.email),
      tel: new FormControl(this.userService.connectedUser.tel),
      age: new FormControl(this.userService.connectedUser.age),
      niveau: new FormControl(this.userService.connectedUser.niveau),
      status: new FormControl(this.userService.connectedUser.status),
      _id: new FormControl(this.userService.connectedUser._id),

    });
    console.log(this.EditUser);
  }

  UpdateUser(user) {
    return this.userService.UpdateUser(user).subscribe((res) => {
      this.userService.getCandidatById(this.userService.connectedUser._id);
      user = res;
      console.log(user)
      localStorage.removeItem("token");
      localStorage.setItem('token', user.token);
      this.userService.connectedUser = this.userService.getDecodedToken();
    });
  }

}
