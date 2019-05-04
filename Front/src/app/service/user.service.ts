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

    loggedIn() {
        const user = localStorage.getItem('token');
        return user != null ? true : false;
    }

    getUsers() {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getUsers', { headers: header });
    }

    getLengthCandidats() {
        return this.http.get('http://localhost:3000/users/getLengthCandidats');
    }
    getNbrCoachs() {
        return this.http.get('http://localhost:3000/users/getNbrCoachs');
    }
    getUser() {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getUser/ ', { headers: header });
    }
    getCandidatById(ID) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(`http://localhost:3000/users/getCandidatById/${ID}`, { headers: header });
    }

    getCoach() {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoach', { headers: header })
    }
    getCoachByUser(id) {       
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoachByUser/' + id, { headers: header })
    }
    getCandidatByNiveau(niveau) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCandidatByNiveau/' + niveau, { headers: header })
    }
    getCandidat() {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCandidat', { headers: header })
    }
    createCoach(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/addCoach', user, { headers: header })
    }
    createCandidat(user) {
        return this.http.post('http://localhost:3000/users/registerCandidat', user)
    }

    loginUser(user) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/login', user, { headers: header })
    }


    deleteUser(user) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id, { headers: header });
    }
    deleteCoach(coach) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/deleteCoach/' + coach._id, { headers: header });
    }
    deleteCandidat(candidat) {
        var header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/deleteCandidat/' + candidat._id, { headers: header });
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

    // UpdateUser(user) {
    //     let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //     return this.http.post('http://localhost:3000/users/updateUser/' + user._id, user, { headers: header })
    // }
    updateCoach(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateCoach/' + user._id, user, { headers: header })
    }
    updateCandidat(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateCandidat/' + user._id, user, { headers: header })
    }
    updateEtatCandidat(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateEtatCandidat/' + user._id, user, { headers: header })
    }
    sendMarks(user, marks) {
        console.log(user.candidat, marks);
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/sendMarks/' + user.candidat + "/" + marks, user, { headers: header })
    }
    logout() {
        localStorage.removeItem('token');
        return this.http.get('http://localhost:3000/users/logout/')
    }
    envoyerMail(candidat) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/sendMail/' + candidat._id, candidat, { headers: header })
    }

    cantactMail(candidat) {
        return this.http.post('http://localhost:3000/users/cantactMail', candidat)
    }
}
