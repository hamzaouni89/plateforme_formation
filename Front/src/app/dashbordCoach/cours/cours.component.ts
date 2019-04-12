import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../service/cours.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  coursForm: FormGroup;
  url: any;
  selectesCour: any; 
  coursUpdateForm: FormGroup;
  cours: any;
  selectedContenue: File;
  constructor(public coursService: CoursService, public sanitizer: DomSanitizer) {
   
    this.coursUpdateForm = new FormGroup({
      titre: new FormControl(),
      descreption: new FormControl(),
      contenue: new FormControl(),
      type: new FormControl(),
      niveau: new FormControl(),
      // owner: new FormControl(),
      date: new FormControl()
    });
  }

  ngOnInit() {
    this.selectesCour = { titre: '' }
    this.getCours()
  }

  getCours() {
    this.coursService.getCours().subscribe((res) => {
      console.log(res)
      //this.coursForm.value.owner = this.userService.connectedUser._id;
      this.cours = res;
    })
  }

  getContenue(cours) {
    this.coursService.getContenue(cours).subscribe(() => {
      return this.getCours();
    })
  }

  handleFileInput(files: FileList) {
    this.selectedContenue = files.item(0);
  }
  

  deleteCours(cours) {
    console.log(cours)
    this.coursService.deleteCours(cours).subscribe(() => {
      this.getCours();
    })
  }

  update(cours) {
    console.log(cours)
    this.coursUpdateForm = new FormGroup({
      titre: new FormControl(cours.titre),
      contenue: new FormControl(cours.contenue),
      type: new FormControl(cours.type),
      descreption: new FormControl(cours.descreption),
      niveau: new FormControl(cours.niveau),
      _id: new FormControl(cours._id)
    });
    console.log(cours)
  }
  UpdateContenue(event) {
    console.log(event[0])
    this.selectedContenue = event[0]
  }
  updateCours(cours) {
    const formData = new FormData();
    if (this.selectedContenue) {
      cours.contenue = this.selectedContenue.name;
      formData.append('contenue', this.selectedContenue)
    }
    return this.coursService.updateCours(cours).subscribe((res) => {
      this.coursService.uploadContenue(formData).subscribe(res => console.log(res))
      console.log(res);
      cours = res;
      this.getCours();
    });
  }

  getUrl(param) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/cours/getContenue/" + param.contenue);
    this.selectesCour = param;
  }

}




