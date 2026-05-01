import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loginService.isLoggedIn().pipe(
      map((estado) => {
        if (estado) {
          return true;
        } else {
          this.router.navigate(['/iniciar-sesion']);
          return false;
        }
      })
    );
  }
}
