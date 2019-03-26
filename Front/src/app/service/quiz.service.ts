import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Quiz } from '../../../../model/quiz';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quiz: Quiz[] = [];
  private quizUpdated = new Subject<{ quiz: Quiz[]}>();

  constructor(private http: HttpClient, private userService: UserService) { }

  ajouterQuiz(quiz) {
    // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/quiz/addQuiz',quiz )
}

  getData() {
    this.http.get<{ quiz: Quiz[] }>('http://localhost:3000/quiz')
    .subscribe((quiz) => {
      this.quiz = quiz.quiz;
      this.quizUpdated.next({ quiz : this.quiz });
    });
  }

  getQuizUpdateListener() {
    return this.quizUpdated.asObservable();
  }

  sendMarks(marks: number) {
    let userEmail = localStorage.getItem("email");
    const data = {
      userEmail: userEmail,
      marks: marks
    };
    this.http.post('http://localhost:3000/quiz/mark', data)
    .subscribe(response => {
        console.log(response);
        alert('Your Submission has been made! Thank You.');
        setTimeout(() => {
            this.userService.logout();
        }, 2000);
    });
}

}
