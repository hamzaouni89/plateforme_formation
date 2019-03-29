import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  ajouterQuiz(quiz) {
    // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/quiz/addQuiz', quiz)
  }

  getQuiz() {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/quiz/getQuiz')
  }

  deleteTest(test) {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/quiz/deleteTest/' + test._id);
  }

  updateTest(test, id) {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/quiz/updateQuiz/' + id, test)

  }


}
