import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoggedIn = signal(false);

  constructor(private loginService: LoginService, private router: Router) {
    // Inicializamos el estado real al cargar la app
    this.loginService.isLoggedIn().subscribe();

    // Sincronizamos el BehaviorSubject con la signal
    this.loginService.currentUserLogInService.subscribe((loggedIn) => {
      this.isLoggedIn.set(loggedIn);
    });
  }

  logout(): void {
    this.loginService.logout().subscribe({
    next: () => {
      this.isLoggedIn.set(false); 
      this.router.navigateByUrl('/iniciar-sesion');
    },
    error: (err) => {
      console.error('Error en logout:', err);
    }
  });
  }
}