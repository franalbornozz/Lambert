import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

export interface User {
  id: number | string;
  nombre: string;
  email: string;
  rol: 'admin' | 'vendedor' | 'ofi_tec';
} 

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLogInService = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((user) => {
        // Guardar usuario y rol
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserLogInService.next(true);
      }),
      catchError(this.handleError)
    );
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Actualizar estado y limpiar usuario
        this.currentUserLogInService.next(false);
        localStorage.removeItem('currentUser');
      }),
      catchError(this.handleError)
    );
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/status`, { withCredentials: true }).pipe(
      map(() => {
        this.currentUserLogInService.next(true);
        return true;
      }),
      catchError(() => {
        this.currentUserLogInService.next(false);
        return of(false);
      })
    );
  }

  // Getter para recuperar el usuario actual
  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en login service:', error);
    return throwError(() => new Error('Algo malo ocurrió; por favor, intenta nuevamente más tarde.')
    );
  }
}

// anotacion para el back: utilizamos HttpOnly para inyectar el HttpClient en el servicio de login, lo que nos permite hacer peticiones HTTP al backend de forma segura.
