

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quiz } from '../../../../model/quiz'
import { Subscription, Subject } from 'rxjs';
import { QuizService } from '../service/quiz.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  isLoading = false;
  quiz: Quiz[] = [];
  private quizSub: Subscription;

  isTimeUp = false;
  
  answer = new Array(this.quiz.length).fill("0");
  correctAnswer = new Array(this.quiz.length).fill(0);
  quizForm: FormGroup;
  marks = 0;
  constructor(public quizService: QuizService , private router: Router) {
    this.quizForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      choix1: new FormControl('', [Validators.required]),
      choix2: new FormControl('', [Validators.required]),
      choix3: new FormControl('', [Validators.required]),
      choix4: new FormControl('', [Validators.required]),
      reponse: new FormControl('', [Validators.required]),
    });
   }

  


  ngOnInit() {
    this.isLoading = true;
    this.quizService.getData();
    this.quizSub = this.quizService.getQuizUpdateListener()
    .subscribe((quizData: { quiz: Quiz[] }) => {
      this.isLoading = false;
      this.quiz = quizData.quiz;
      for (let q =0; q < this.quiz.length; q++) {
        this.correctAnswer[q] = this.quiz[q].reponse;
      }
      // console.log(this.correctAnswer);
      let timer = setTimeout(() => {
        this.isTimeUp = true;
        // console.log(this.answer);
      }, 300000);
    });

  }
  ajouterQuiz() {
    console.log(this.quizForm.value)
    this.quizService.ajouterQuiz(this.quizForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  onSubmit() {
    for (let a = 0; a < this.quiz.length; a++) {
      if(this.answer[a] === this.correctAnswer[a]) {
        this.marks += 1;
      }
    }
    console.log(this.marks);
    this.quizService.sendMarks(this.marks);
  }

  ngOnDestroy() {
    this.quizSub.unsubscribe();
  }

}
