import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-candidats-by-niveau',
  templateUrl: './candidats-by-niveau.component.html',
  styleUrls: ['./candidats-by-niveau.component.css']
})
export class CandidatsByNiveauComponent implements OnInit {
  candidats: any;
  users :  any;
  mail : any;
  ModiFormCandidats: FormGroup;
  constructor(private userService: UserService) { 
    this.userService.getUser().subscribe(res => {
      this.users = res;
    })
    this.userService.getCandidat().subscribe(res => {
      this.candidats = res;
    })
    this.ModiFormCandidats = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      niveau: new FormControl(),
      age: new FormControl(),
      email: new FormControl(),
      tel: new FormControl(),
      etat: new FormControl(),
      status: new FormControl(),
      owner: new FormControl(),
    });

  }

  ngOnInit() {
  }
  getCandidat() {
    this.userService.getCandidat().subscribe((res) => {
      console.log(res)
      this.candidats = res;
    })
  }
  getUser() {
    this.userService.getUser().subscribe((res) => {
      console.log(res)
      this.users = res;
    })
  }

  getCandidatByUser(id){
    this.userService.getCandidatByUser(id).subscribe((res) => {
      console.log(res)
       this.mail = res;
    })
  }

  update(candidat) {
    this.userService.getCandidatByUser(candidat._id).subscribe(res => {
      let email = res['email'];

    this.ModiFormCandidats = new FormGroup({
      nom: new FormControl(candidat.nom),
      prenom: new FormControl(candidat.prenom),
      tel: new FormControl(candidat.tel),
      age: new FormControl(candidat.age),
      status: new FormControl(candidat.status),
      etat: new FormControl(candidat.etat),
      email: new FormControl(email),
      niveau: new FormControl(candidat.niveau),
      _id: new FormControl(candidat._id)
    });
   })
  }
  updateCandidat(candidat) {
    return this.userService.updateCandidat(candidat).subscribe((res) => {
      console.log(res);
      this.userService.getCandidat().subscribe(res => {
        this.candidats = res;
      })
      this.userService.getUser().subscribe(res => {
        this.users = res;
      })
    });
  }

  deleteCandidat(candidat) {
    console.log(candidat)
    this.userService.deleteCandidat(candidat).subscribe(() => {
      this.getCandidat();
    })
  }
}
