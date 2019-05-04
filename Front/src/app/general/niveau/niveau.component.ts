import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/service/cours.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {
  cours: any;
  users: any;
  coachs: any;
  constructor(private userService: UserService, private coursService: CoursService) { }

  ngOnInit() {
    this.getLengthCandidats();
    this.getNbrCours();
    this.getNbrCoachs()
  }
  getLengthCandidats() {
    return this.userService.getLengthCandidats().subscribe((res) => {
      this.users = res;
    })
  }
  getNbrCoachs() {
    return this.userService.getNbrCoachs().subscribe((res) => {
      this.coachs = res;
    })
  }
  getNbrCours() {
    return this.coursService.getNbrCours().subscribe((res) => {
      this.cours = res;
    })
  }

}
