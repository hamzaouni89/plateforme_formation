import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../../../../model/test';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  private questions: Test[] = [];
  private questionsUpdated = new Subject<{ questions: Test[]}>();
  
  constructor(private http: HttpClient , public userService :  UserService) { }

  ajouterTest(test) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/test/addTest', test , { headers: header})
  }

  getTest() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/test/getTest', { headers: header})
  }

  getTestByNiveau(niveau) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/test/getTestByNiveau/${niveau}` ,{ headers: header})
  }

  deleteTest(test) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/test/deleteTest/' + test._id, { headers: header});
  }

  updateTest(test, id) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/test/updateTest/' + id, test, { headers: header})

  }



  getData() {
    this.http.get<{ questions: Test[] }>('http://localhost:3000/test/getTest')
    .subscribe((questions) => {
      this.questions = questions.questions;
      this.questionsUpdated.next({ questions: this.questions });
    });
  }

  getQuestionsUpdateListener() {
    return this.questionsUpdated.asObservable();
  }

  sendMarks(marks: number) {
    let userEmail = localStorage.getItem("email");
    const data = {
      userEmail: userEmail,
      marks: marks
    };
    this.http.post("http://localhost:3000/test/mark", data)
    .subscribe(response => {
        console.log(response);
        alert('Your Submission has been made! Thank You.');
        setTimeout(() => {
            this.userService.logout();
        }, 2000);
    });
}
}
