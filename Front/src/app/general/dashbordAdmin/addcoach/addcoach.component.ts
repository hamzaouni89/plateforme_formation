import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcoach',
  templateUrl: './addcoach.component.html',
  styleUrls: ['./addcoach.component.css']
})
export class AddCoachComponent implements OnInit {

  coachForm: FormGroup;
  constructor(private userService: UserService) {
    this.coachForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(8), , Validators.required]),
      password2: new FormControl('', [Validators.required]),
     // owner: new FormControl(),
    });
   }

  ngOnInit() {
  }

  createCoach() {
      console.log(this.coachForm.value)
      this.userService.createCoach(this.coachForm.value).subscribe((res) => {
        console.log(res);
      });
    }

  

}
