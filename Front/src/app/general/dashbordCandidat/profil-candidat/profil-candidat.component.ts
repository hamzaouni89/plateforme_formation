import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
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
    this.router.navigateByUrl('/general/login');
  }

  update(user) {
    this.EditUser = new FormGroup({
      nom: new FormControl(this.userService.connectedUser.nom),
      prenom: new FormControl(this.userService.connectedUser.prenom),
      email: new FormControl(this.userService.connectedUser.email),
      tel: new FormControl(this.userService.connectedUser.tel),
      age: new FormControl(this.userService.connectedUser.age),
      etat: new FormControl(this.userService.connectedUser.etat),
      status: new FormControl(this.userService.connectedUser.status),
      notes: new FormControl(this.userService.connectedUser.notes),
      marks: new FormControl(this.userService.connectedUser.marks),
      nivea: new FormControl(this.userService.connectedUser.niveau),
      _id: new FormControl(this.userService.connectedUser.candidat),
    });
  }

  UpdateUser(candidat) {    
    console.log(candidat);
    return this.userService.updateCandidat(candidat).subscribe((res) => {
      this.userService.getCandidatById(this.userService.connectedUser._id);
      this.user = res;
      console.log(this.user)
      localStorage.removeItem("token");
      localStorage.setItem('token', this.user.token);
      this.userService.connectedUser = this.userService.getDecodedToken();
    });
  }

}
