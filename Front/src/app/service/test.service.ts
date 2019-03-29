import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  constructor(private http: HttpClient) { }

  ajouterTest(test) {
    // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/test/addTest', test)
  }

  getTest() {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/test/getTest')
  }

  deleteTest(test) {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/test/deleteTest/' + test._id);
  }

  updateTest(test, id) {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/test/updateTest/' + id, test)

  }
}
