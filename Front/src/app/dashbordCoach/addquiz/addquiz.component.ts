import { Component, OnInit } from '@angular/core';
import { QuizService } from './../../service/quiz.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent implements OnInit {
  quiz: any;
  quizForm: FormGroup;
  quizArrayForm: FormArray;
  constructor(public quizService: QuizService) { 
    this.quizForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions: new FormArray([this.quizzArrayForm()]),
    });

  }

  ngOnInit() {
    this.quizForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dure: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      questions: new FormArray([this.quizzArrayForm()]),
    });
    this.getQuiz();
  }

  addQuestion() {
    let questions = this.quizForm.get('questions') as FormArray
    questions.push(this.quizzArrayForm());
  }

  deleteQuestion(i) {
    let questions = this.quizForm.get('questions') as FormArray
    questions.removeAt(i);
  }
  ajouterQuiz() {
    console.log(this.quizForm.value)
    this.quizService.ajouterQuiz(this.quizForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  getQuiz() {
    this.quizService.getQuiz().subscribe((res) => {
      console.log(res)
      this.quiz = res;
    })
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
}
