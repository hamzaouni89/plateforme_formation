import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import * as jwt_decode from 'jwt-decode';
//import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {
  // private loggedIn = false;
  constructor(private router: Router,private userService : UserService) { 
}

canActivate() {
  if (this.userService.loggedIn()) {
      return true;
  } else {
      this.router.navigate(['/general/login']);
      return false;
  }
}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     console.log(this.auth.getDecodedToken())
  //   if (this.auth.getDecodedToken() !== null) {
  //     console.log(this.auth.verifToken())
  //     if (this.auth.verifToken() === false) {
  //       return true;
  //     }
  //     else {
  //       this.router.navigateByUrl('/login');
  //     }
  //   }
  // }
}
// export class AuthGuard implements CanActivate {
//   id_user = jwt_decode(localStorage.getItem('token'))


//   constructor( private router: Router) { }


//   canActivate():  boolean {
//     console.log(this.id_user);
//     if ( this.id_user) {
//       return true;
//     } else {
//   this.router.navigateByUrl('/login');
//   return false;
// }
// ;
 
//   }
 
// }

