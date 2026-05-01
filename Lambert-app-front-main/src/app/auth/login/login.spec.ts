import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { Login } from './login';
import { LoginService } from '../../services/auth/login.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockLoginService: any;
  let mockRouter: any;

  beforeEach(async () => {
    // Mock del servicio LoginService
    mockLoginService = {
      login: jasmine
        .createSpy('login')
        .and.returnValue(
          of({ token: 'mock-token-123', user: { name: 'Esteban', email: 'test@test.com' } })
        ),
    };

    // Mock del Router
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Login],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service on valid form submission', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: '123456' });
    component.login();

    expect(mockLoginService.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/inicio');
  });

  it('should not call login service on invalid form submission', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.login();

    expect(mockLoginService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });
});
