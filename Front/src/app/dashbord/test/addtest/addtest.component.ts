import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../service/test.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router"

@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.css']
})
export class AddtestComponent implements OnInit {
  test: any;
  testForm: FormGroup;
  testArrayForm: FormArray;
  constructor(public testService: TestService, private router: Router) { 
    this.testForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions: new FormArray([this.testtArrayForm()]),
    });

  }

  ngOnInit() {
    this.testForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions: new FormArray([this.testtArrayForm()]),
    });
    this.getTest();
  }

  addQuestion() {
    let questions = this.testForm.get('questions') as FormArray
    questions.push(this.testtArrayForm());
  }

  deleteQuestion(i) {
    let questions = this.testForm.get('questions') as FormArray
    questions.removeAt(i);
  }

  testtArrayForm(): FormGroup {
    return new FormGroup({
      question: new FormControl('', [Validators.required]),
      choix1: new FormControl('', [Validators.required]),
      choix2: new FormControl('', [Validators.required]),
      choix3: new FormControl('', [Validators.required]),
      choix4: new FormControl('', [Validators.required]),
      reponse: new FormControl('', [Validators.required])
    })
  }

  ajouterTest() {
    console.log(this.testForm.value)
    this.testService.ajouterTest(this.testForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  getTest() {
    this.testService.getTest().subscribe((res) => {
      console.log(res)
      this.test = res;
    })
  }

}
