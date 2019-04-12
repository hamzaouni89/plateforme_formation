import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../service/cours.service';
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
  selectedContenue: File;
  constructor(public coursService: CoursService, public sanitizer: DomSanitizer , public userService : UserService) { }

  ngOnInit() {
    this.selectesCour = { titre: '' }
    this.getCoursByNiveau()
  }

  getCoursByNiveau() {
    this.coursService.getCoursByNiveau(this.userService.connectedUser.niveau).subscribe(res => {
      //this.coursForm.value.owner = this.userService.connectedUser._id;
      this.cours = res;
      console.log(this.cours)
    })
  }

  getContenue(cours) {
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
      this.coursService.validerCours(idCours).subscribe(res => {
      console.log(res);
      this.cours = res;
      this.getCoursByNiveau();
    });
  }

  getUrl(param) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/cours/getContenue/" + param.contenue);
    this.selectesCour = param;
  }

}
