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

    getCoach() {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getCoach', { headers: header })
            .map(res => res);
    }

    createCoach(user) {
        // let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/registerCoach', user)
            .map(res => res);
    }


    loginUser(user) {

        return this.http.post('http://localhost:3000/users/login', user)
            .map((res: any) => res);
    }


    deleteUser(user) {

        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id);
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

    getUser(ID) {
        return this.http.get('http://localhost:3000/users/getuser/ ' + ID);
    }

    UpdateUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateUser/' + user._id, user, { headers: header })
            .map(res => res);
    }

    logout() {

        localStorage.removeItem('email');
        this.router.navigate(['/']);
    }
}
