import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
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
  ModiFormCoach: FormGroup;
  //coachs: any;

  constructor(private userService: UserService) {
    this.ModiFormCoach = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      niveau: new FormControl(),
      tel: new FormControl(),
      owner: new FormControl(),
    });

  }

  ngOnInit() {
    this.getCoach();

  }
  getCoach() {
    this.userService.getCoach().subscribe((res) => {
      console.log(res)
      this.Coachs = res;
    })
  }
  update(coach) {

    //console.log(coach)
    this.ModiFormCoach = new FormGroup({
      nom: new FormControl(coach.nom),
      prenom: new FormControl(coach.prenom),
      tel: new FormControl(coach.tel),
      niveau: new FormControl(coach.niveau),
      _id: new FormControl(coach._id)
    });
    // console.log(this.coachs)
  }
  updateCoach(coach) {
    return this.userService.updateCoach(coach).subscribe((res) => {
      console.log(res);
      coach = res;
      // this.getCoach();
    });
  }
}
