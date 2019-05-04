import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cantact',
  templateUrl: './cantact.component.html',
  styleUrls: ['./cantact.component.css']
})
export class CantactComponent implements OnInit {
  MailForm : FormGroup;
  constructor(private userService: UserService) {

    this.MailForm = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      tel: new FormControl(),
      message: new FormControl(),
      email: new FormControl(),
      password :new FormControl(), 
      
    })
   }

  ngOnInit() {
  }
  
  enoyerMail(candidat){ 
    this.userService.cantactMail(candidat).subscribe(() => {
      console.log("Mail envoyer")
    })
  }
}
