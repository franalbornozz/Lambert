import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './login.service';

export const LOGIN_BACKEND = new InjectionToken<(credentials: LoginRequest) => Observable<any>>(
  'LOGIN_BACKEND'
);
