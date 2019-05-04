import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../../service/cours.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-cours-candidat',
  templateUrl: './cours-candidat.component.html',
  styleUrls: ['./cours-candidat.component.css']
})
export class CoursCandidatComponent implements OnInit {
  coursForm: FormGroup;
  url: any;
  selectesCour: any; 
  cours: any;
  coursNonValider: any;
  selectedContenue: File;
  user
  constructor(public coursService: CoursService, public sanitizer: DomSanitizer , public userService : UserService) { }

  ngOnInit() {
    this.selectesCour = { titre: '' }
    this.getCoursByNiveau()
    this.user = this.userService.connectedUser;    
  }

  getCoursByNiveau() {
    this.cours = [];
    this.coursService.getCoursByNiveau(this.userService.connectedUser.niveau).subscribe(res => {
      this.coursNonValider = res;
      for (const cour of this.coursNonValider) {
          if(cour.status.length > 0){
            for (const stat of cour.status) {
              if( stat.statu === 'Non Valider' && stat.idCandidat === this.userService.connectedUser.candidat)
              {cour['etat'] = "nonValider"
              this.cours.push(cour);
              } else {
                cour['etat'] = "Valider"
              this.cours.push(cour);
              }
            }
          }else {
            cour['etat'] = "nonValider"
              this.cours.push(cour);
          }
      }
    })
  }

  getContenue(cours) {
    console.log(cours);  
    this.coursService.getContenue(cours).subscribe(() => {
      return this.getCoursByNiveau();
    })
  }

  handleFileInput(files: FileList) {
    this.selectedContenue = files.item(0);
  }
  
  UpdateContenue(event) {
    console.log(event[0])
    this.selectedContenue = event[0]
  }
  validerCours(idCours) {
      this.coursService.validerCours(idCours , this.userService.connectedUser.candidat).subscribe(res => {
      console.log(res);
      this.getCoursByNiveau();
    });
  }

  getUrl(param) {

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/cours/getContenue/" + param.contenue);
    this.selectesCour = param;
  }

}
