import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    const user = this.loginService.getCurrentUser();
    
    if (user?.rol === 'admin') {
      return true;
    }

    // Si no es admin, redirigimos al dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
}
