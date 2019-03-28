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

   getContenue(cours) {
   // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getContenue/' + cours)
     
  }

  uploadContenue(file) {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/cours/upload', file)
     
  }
  getCours() {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getCours')
      
  }
  getCoursById(IdUser) {
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getCours' + IdUser)
     
  }

  createCours(cours) {
   // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/cours/addCours', cours)
      
  }
  deleteCours(cours) {
   // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/deleteCours/' + cours._id);
  }

  updateCours(cours) {
   // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/cours/updateCours/' + cours._id, cours)
      
  }
}
