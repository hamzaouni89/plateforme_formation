import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'


@Injectable({
    providedIn: 'root'
})
export class UserService {

    connectedUser: any;
    Coachs: any;

    constructor(private http: HttpClient, private router: Router) {
        this.connectedUser = this.getDecodedToken();
    }

    getUser() {
        return this.http.get('http://localhost:3000/users/getUser/ ');
    }

    getCoach() {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoach')
    }
    getCoachByUser(id) {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoachByUser/'+ id)
    }
    getCandidatByUser(id){
         // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
         return this.http.get('http://localhost:3000/users/getCandidatByUser/'+ id)
    }
    getCandidat() {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCandidat')
    }

    createCoach(user) {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/addCoach', user)
    }


    loginUser(user) {
        return this.http.post('http://localhost:3000/users/login', user)
            .map((res: any) => res);
    }


    deleteUser(user) {
        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id);
    }
    deleteCoach(coach) {

        return this.http.get('http://localhost:3000/users/deleteCoach/' + coach._id);
    }
    deleteCandidat(candidat) {
        return this.http.get('http://localhost:3000/users/deleteCandidat/' + candidat._id);
    }

    getToken(): string {

        return localStorage.getItem('token');
    }
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getDecodedToken() {
        if (localStorage.getItem('token')) {
            var decoded = jwt_decode(localStorage.getItem('token'));
            return decoded;
        }
    }

    UpdateUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateUser/' + user._id, user, { headers: header })
            .map(res => res);
    }
    updateCoach(user) {
       // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateCoach/' + user._id, user)
            .map(res => res);
    }
    updateCandidat(user) {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
         return this.http.post('http://localhost:3000/users/updateCandidat/' + user._id, user)
             .map(res => res);
     }
     updateStatuCandidat(user) {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
         return this.http.post('http://localhost:3000/users/updateStatuCandidat/' + user._id, user)
             .map(res => res);
     }
    logout() {
        localStorage.removeItem('email');
        this.router.navigate(['/']);
    }
    envoyerMail(candidat){
        return this.http.post('http://localhost:3000/users/sendMail/'+ candidat._id, candidat )
    }

}
