import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RegisterRequest {
  nombre: string;
  dni: string;
  email: string;
  password: string;
  rol: 'admin' | 'vendedor' | 'ofi_tec';
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000';
  private registerStatus = new BehaviorSubject<boolean>(false);

  currentUserRegisterService = this.registerStatus.asObservable();

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, data, { withCredentials: true });
  }

  setRegisterStatus(status: boolean) {
    this.registerStatus.next(status);
  }
}