import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) {
    
   }

   getImage(image) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getImage/' + image, { headers: header })
      .map(res => res);
  }

  uploadImage(file) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/cours/upload', file, { headers: header })
      .map(res => res);
  }
  getCours() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get('http://localhost:3000/cours/getCours', { headers: header })
      .map(res => res);
  }
  getCoursById(IdUser) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getCours' + IdUser, { headers: header })
      .map(res => res);
  }

  createCours(cours) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/cours/addCours', cours, { headers: header })
      .map(res => res);
  }
  deleteArticle(cours) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/deleteCours/' + cours._id, { headers: header });
  }

  updateArticle(cours) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/cours/updateCours/' + cours._id, cours, { headers: header })
      .map(res => res);
  }
}
