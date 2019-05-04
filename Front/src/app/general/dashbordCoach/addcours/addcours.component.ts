import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../../service/cours.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-addcours',
  templateUrl: './addcours.component.html',
  styleUrls: ['./addcours.component.css']
})
export class AddcoursComponent implements OnInit {
  coursForm: FormGroup;
  cours : any;
  selectedContenue: File;
  constructor(public coursService: CoursService, public sanitizer: DomSanitizer) { 
    this.coursForm = new FormGroup({
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
    
    this.getCours()
  }

  getCours() {
    this.coursService.getCours().subscribe((res) => {
      console.log(res)
      //this.coursForm.value.owner = this.userService.connectedUser._id;
      this.cours = res;
    })
  }

  createCours() {
    console.log(this.coursForm.value)
    //this.coursForm.value.owner = this.userService.connectedUser._id;
    this.coursForm.value.contenue = this.selectedContenue.name;
    this.coursService.createCours(this.coursForm.value).subscribe((res) => {
      const file = new FormData()
      file.append("contenue", this.selectedContenue);
      this.coursService.uploadContenue(file).subscribe(res => console.log(res))
      console.log(res);
      this.getCours()

    });
  }
  handleFileInput(files: FileList) {
    this.selectedContenue = files.item(0);
  }
  
}
 