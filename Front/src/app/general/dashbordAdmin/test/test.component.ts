import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../service/test.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router"

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: any;
  testForm: FormGroup;
  testUpdateForm : FormGroup;
  testArrayForm: FormArray;
  idTest;

  constructor(public testService: TestService, private router: Router) {
    this.testUpdateForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions: new FormArray([]),
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

  
  addUpdateQuestion() {
    let questions = this.testUpdateForm.get('questions') as FormArray
    questions.push(this.testtArrayForm());
  }

  deleteUpdateQuestion(i) {
    let questions = this.testUpdateForm.get('questions') as FormArray
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

  getTest() {
    this.testService.getTest().subscribe((res) => {
      console.log(res)
      this.test = res;
    })
  }

  deleteTest(test) {
    console.log(test)
    this.testService.deleteTest(test).subscribe(() => {
      this.getTest();
    })
  }

  update(test) {
    this.idTest = test._id;
    this.testUpdateForm = new FormGroup({
      titre: new FormControl(test.titre),
      descreption: new FormControl(test.descreption),
      type: new FormControl(test.type),
      dure: new FormControl(test.dure),
      niveau: new FormControl(test.niveau),
      questions: new FormArray([]),
    });
    console.log(test.questions)
    this.getQuestion(test.questions);
  }

  getTesttArrayForm(questions): FormGroup {
    return new FormGroup({
      question: new FormControl(questions.question),
      choix1: new FormControl(questions.choix1),
      choix2: new FormControl(questions.choix2),
      choix3: new FormControl(questions.choix3),
      choix4: new FormControl(questions.choix4),
      reponse: new FormControl(questions.reponse),
    })
  }

  getQuestion(questions) {
    const updateQuestion = this.testUpdateForm.get('questions') as FormArray
    for (let i=0 ; i<questions.length ; i++){
      updateQuestion.push(this.getTesttArrayForm(questions[i]));
    }
    
  }

  updateTest(test) {
   this.testService.updateTest(test,this.idTest).subscribe((res) => {
      console.log(res);
      test = res;
      this.getTest();
    });
  }

}
