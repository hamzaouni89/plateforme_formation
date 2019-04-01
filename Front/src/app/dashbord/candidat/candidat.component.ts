import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  candidat: any;
  ModiFormCandidats: FormGroup;
  constructor(private userService: UserService) { 
    this.ModiFormCandidats = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      niveau: new FormControl(),
      age: new FormControl(),
      tel: new FormControl(),
      etat: new FormControl(),
      status: new FormControl(),
      owner: new FormControl(),
    });

  }

  ngOnInit() {
    this.getCandidat();

  }
  getCandidat() {
    this.userService.getCandidat().subscribe((res) => {
      console.log(res)
      this.candidat = res;
    })
  }
  update(candidat) {

    this.ModiFormCandidats = new FormGroup({
      nom: new FormControl(candidat.nom),
      prenom: new FormControl(candidat.prenom),
      tel: new FormControl(candidat.tel),
      age: new FormControl(candidat.age),
      status: new FormControl(candidat.status),
      etat: new FormControl(candidat.etat),
      niveau: new FormControl(candidat.niveau),
      _id: new FormControl(candidat._id)
    });
    // console.log(this.candidats)
  }
  updateCandidat(candidat) {
    return this.userService.updateCandidat(candidat).subscribe((res) => {
      console.log(res);
      candidat = res;
      // this.getcandidat();
    });
  }

  deleteCandidat(candidat) {
    console.log(candidat)
    this.userService.deleteCandidat(candidat).subscribe(() => {
      this.getCandidat();
    })
  }

}
