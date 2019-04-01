import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {
  http: Http;
  Coachs: any;
  users : any
  mail :any;
  
  ModiFormCoach: FormGroup;
  //coachs: any;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(res => {
      this.users = res;
      console.log(this.users.email)
    })
    this.userService.getCoach().subscribe(res => {
      this.Coachs = res;
    })
    this.ModiFormCoach = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      niveau: new FormControl(),
      tel: new FormControl(),
      email: new FormControl(),
      owner: new FormControl(),
    });

  }

  ngOnInit() {
    // this.getCoach();
    // this.getUser();
  }

  getCoach() {
    this.userService.getCoach().subscribe((res) => {
      console.log(res)
      this.Coachs = res;
    })
  }
  getUser() {
    this.userService.getUser().subscribe((res) => {
      console.log(res)
      this.users = res;
    })
  }
  getUsers(id){
    
    this.userService.getUsers(id).subscribe((res) => {
      console.log(res)
       this.mail = res;
    })
  }
  
  update(coach) {
    this.userService.getUsers(coach._id).subscribe(res => {
      let email = res['email'];
      this.ModiFormCoach = new FormGroup({
        nom: new FormControl(coach.nom),
        prenom: new FormControl(coach.prenom),
        tel: new FormControl(coach.tel),
        niveau: new FormControl(coach.niveau),
        email: new FormControl(email),
        _id: new FormControl(coach._id)
      });
    })
  }

  updateCoach(coach) {
    this.userService.updateCoach(coach).subscribe((res) => {
      console.log(res)
      this.userService.getCoach().subscribe(res => {
        this.Coachs = res;
      })
      this.userService.getUser().subscribe(res => {
        this.users = res;
      })
    });
    
  }

  deleteCoach(coach) {
    console.log(coach)
    this.userService.deleteCoach(coach).subscribe(() => {
      this.getCoach();
    })
  }
}
