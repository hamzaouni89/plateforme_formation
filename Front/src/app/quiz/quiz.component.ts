

import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../../model/quiz'
import { QuizService } from '../service/quiz.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router"
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: Quiz[] = [];  
  quizForm: FormGroup;
  quizArrayForm : FormArray;
  constructor(public quizService: QuizService , private router: Router) {
    this.quizForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions : new FormArray([this.quizzArrayForm()]),
    });          
   }

  addQuestion(){
    let questions = this.quizForm.get('questions') as FormArray
           questions.push(this.quizzArrayForm());
  }

  deleteQuestion(i){
    let questions = this.quizForm.get('questions') as FormArray
           questions.removeAt(i);
  }
  quizzArrayForm() : FormGroup{
    return new FormGroup ({
      question: new FormControl('', [Validators.required]),
      choix1: new FormControl('', [Validators.required]),
      choix2: new FormControl('', [Validators.required]),
      choix3: new FormControl('', [Validators.required]),
      choix4: new FormControl('', [Validators.required]),
      reponse: new FormControl('', [Validators.required])
    })
  }
    
  ajouterQuiz() {
    console.log(this.quizForm.value)
    this.quizService.ajouterQuiz(this.quizForm.value).subscribe((res) => {
      console.log(res);
    });
  }
 

 
  ngOnInit() {
    // this.isLoading = true;
    // this.quizService.getData();
    // this.quizSub = this.quizService.getQuizUpdateListener()
    // .subscribe((quizData: { quiz: Quiz[] }) => {
    //   this.isLoading = false;
    //   this.quiz = quizData.quiz;
    //   for (let q =0; q < this.quiz.length; q++) {
    //     this.correctAnswer[q] = this.quiz[q].reponse;
    //   }
    //   // console.log(this.correctAnswer);
    //   let timer = setTimeout(() => {
    //     this.isTimeUp = true;
    //     // console.log(this.answer);
    //   }, 300000);
    // });
    this.quizForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions : new FormArray([this.quizzArrayForm()]),
    });    
  }
}
