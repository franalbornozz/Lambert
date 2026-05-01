import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  userLoginOn = false;
  currentUser: User | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject
    this.loginService.currentUserLogInService.subscribe(
      estado => this.userLoginOn = estado
    );

    // Verificar cookie
    this.loginService.isLoggedIn().subscribe(
      estado => this.userLoginOn = estado
    );

    // Recuperar usuario y rol
      this.currentUser = this.loginService.getCurrentUser();
    };
    
  }
