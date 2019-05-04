import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) {
    
  }

  getContenue(cours) {
    console.log(cours);
    
    //let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getContenue/' + cours)
  }

  uploadContenue(file) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/cours/upload', file, { headers: header})

  }
  getCours() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getCours', { headers: header})
  }
  getCoursByNiveau(niveau) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/getCoursByNiveau/' + niveau, { headers: header})
  }
  
  getNbrCours(){
    return this.http.get('http://localhost:3000/cours/getNbrCours');
}
  validerCours(cours , idCandidat) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
   return this.http.post('http://localhost:3000/cours/validerCours/' + cours._id + "/" + idCandidat, cours, { headers: header }) 
}

  createCours(cours) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/cours/addCours', cours, { headers: header})

  }
  deleteCours(cours) {
     let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/cours/deleteCours/' + cours._id, { headers: header})
  }

  updateCours(cours) {
     let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/cours/updateCours/' + cours._id, cours, { headers: header})
  }
}
