import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterPipe } from './../../../service/filter.pipe'

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  candidats: any;
  candidatsByniveau: any;
  users :  any;
  mail : any;
  ModiFormCandidats: FormGroup;
  MailForm : FormGroup;
  searchText : String;
  constructor(private userService: UserService) { 

    this.userService.getUser().subscribe(res => {
      this.users = res;
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
    this.MailForm = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      tel: new FormControl(),
      message: new FormControl(),
      email: new FormControl(),
      subject :new FormControl(), 
      password : new FormControl(),
      nomCandidat: new FormControl(),
      prenomCandidat: new FormControl(),
      emailCandidat: new FormControl(),
    })

  }

  ngOnInit() {

    this.userService.getCandidat().subscribe(res => {
      this.candidats = res;
      this.candidats.filterPredicate = (data, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        const listAsFlatString = (obj): string => {
          let returnVal = '';
          Object.values(obj).forEach((val) => {
            if (typeof val !== 'object') {
              returnVal = returnVal + ' ' + val;
            } else if (val !== null) {
              returnVal = returnVal + ' ' + listAsFlatString(val);
            }
          });
          return returnVal.trim().toLowerCase();
        };
        return listAsFlatString(data).includes(transformedFilter);
      };
    });
   
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

  getCandidatByNiveau(id){
    this.userService.getCandidatByNiveau(id).subscribe((res) => {
      console.log(res)
       this.candidatsByniveau = res;
    })
  }

  update(candidat) {
    this.userService.getCandidatByNiveau(candidat._id).subscribe(res => {
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

  updateStatuCandidat(candidat) {
    return this.userService.updateEtatCandidat(candidat).subscribe((res) => {
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
  sendMail(candidat) {
    this.userService.getCandidatByNiveau(candidat._id).subscribe(res => {
      let email = res['email'];

    this.MailForm = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      email: new FormControl(),
      tel: new FormControl(),    
      message: new FormControl(), 
      subject : new FormControl(),  
      password :new FormControl(),   
      nomCandidat: new FormControl({value: candidat.nom , disabled: false}),
      prenomCandidat: new FormControl({value: candidat.prenom , disabled: true}),
      emailCandidat: new FormControl({value:email , disabled: true}),
      _id: new FormControl(candidat._id)
    });
   })
  }


  enoyerMail(candidat){ 
    this.userService.envoyerMail(candidat).subscribe(() => {
      this.getCandidat();
    })
  }

}
