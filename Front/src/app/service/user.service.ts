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
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getUser/ ', { headers: header });
    }

    getCoach() {
     let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoach', { headers: header })
    }
    getCoachByUser(id) {
         let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoachByUser/' + id, { headers: header })
    }
    getCandidatByUser(id) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCandidatByUser/' + id, { headers: header })
    }
    getCandidat() {
        let header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/getCandidat', { headers: header})
    }
    createCoach(user) {
         let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/addCoach', user, { headers: header })
    }
    createCandidat(user) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/registerCandidat', user, { headers: header})
    }


    loginUser(user) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/login', user, { headers: header})
    }


    deleteUser(user) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id, { headers: header});
    }
    deleteCoach(coach) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/deleteCoach/' + coach._id, { headers: header});
    }
    deleteCandidat(candidat) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/deleteCandidat/' + candidat._id, { headers: header});
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
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateCoach/' + user._id, user, { headers: header })
            .map(res => res);
    }
    updateCandidat(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateCandidat/' + user._id, user, { headers: header })
            .map(res => res);
    }
    updateStatuCandidat(user) {
         let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateStatuCandidat/' + user._id, user, { headers: header })
            .map(res => res);
    }
    sendMarks(user , marks){
        console.log( user.candidat , marks);
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/sendMarks/' + user.candidat + "/"+ marks ,user, { headers: header })
    }
    logout() {
        // localStorage.removeItem('email');
        // this.router.navigate(['/']);
        return this.http.get('http://localhost:3000/users/logout', {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        })
    }
    envoyerMail(candidat) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/sendMail/' + candidat._id, candidat, { headers: header})
    }

}
