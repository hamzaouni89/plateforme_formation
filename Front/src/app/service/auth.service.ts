import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectedUser:any;
  constructor(private http : HttpClient) {
    this.connectedUser = this.getDecodedToken();
   }

 
  createCandidat(body)  {
    return this.http.post('http://localhost:3000/users/createCandidat', body);
  }

  loginUser(body) {
    return this.http.post('http://localhost:3000/users/login', body);
  }


  setToken(token){
    localStorage.setItem('token', token);
  }
  getDecodedToken() {
    if (localStorage.getItem('token')) {
        var decoded = jwt_decode(localStorage.getItem('token'));
        return decoded;
    }
}



  verifToken()
  {
    let decode = localStorage.getItem('token');
    let helper = new jwt_decode();
    return helper.isTokenExpired(decode);
  }



}
