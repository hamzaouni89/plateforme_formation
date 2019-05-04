import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  ajouterQuiz(quiz) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/quiz/addQuiz', quiz, { headers: header})
  }

  getQuiz() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/quiz/getQuiz', { headers: header})
  }

  deleteTest(test) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/quiz/deleteTest/' + test._id, { headers: header});
  }

  updateTest(test, id) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/quiz/updateQuiz/' + id, test, { headers: header})
  }

  getQuizByNiveau(niveau) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/quiz/getQuizByNiveau/${niveau}` ,{ headers: header})
  }
 

}
