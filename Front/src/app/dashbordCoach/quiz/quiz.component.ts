

import { Component, OnInit } from '@angular/core';
import { QuizService } from './../../service/quiz.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router"
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: any;
  quizUpdateForm : FormGroup;
  quizArrayForm: FormArray;
  idTest;
  constructor(public quizService: QuizService, private router: Router) {
   

    this.quizUpdateForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions: new FormArray([]),
    });
  }

  ngOnInit() {
    this.getQuiz();
  }

  addUpdateQuestion() {
    let questions = this.quizUpdateForm.get('questions') as FormArray
    questions.push(this.quizzArrayForm());
  }
  quizzArrayForm(): FormGroup {
    return new FormGroup({
      question: new FormControl('', [Validators.required]),
      choix1: new FormControl('', [Validators.required]),
      choix2: new FormControl('', [Validators.required]),
      choix3: new FormControl('', [Validators.required]),
      choix4: new FormControl('', [Validators.required]),
      reponse: new FormControl('', [Validators.required])
    })
  }

  deleteUpdateQuestion(i) {
    let questions = this.quizUpdateForm.get('questions') as FormArray
    questions.removeAt(i);
  }

  deleteTest(test) {
    console.log(test)
    this.quizService.deleteTest(test).subscribe(() => {
      this.getQuiz();
    })
  }

  updateQuiz(test) {
    this.idTest = test._id;
    this.quizUpdateForm = new FormGroup({
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

  getQuizzArrayForm(questions): FormGroup {
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
    const updateQuestion = this.quizUpdateForm.get('questions') as FormArray
    for (let i=0 ; i<questions.length ; i++){
      updateQuestion.push(this.getQuizzArrayForm(questions[i]));
    }
    
  }
  getQuiz() {
    this.quizService.getQuiz().subscribe((res) => {
      console.log(res)
      this.quiz = res;
    })
  }

  updateTest(quiz) {
   this.quizService.updateTest(quiz,this.idTest).subscribe((res) => {
      console.log(res);
      quiz = res;
      this.getQuiz();
    });
  }




}
