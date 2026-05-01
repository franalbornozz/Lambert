import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { UsuariosComponent } from './usuarios';
import { UserService } from '../../services/auth/user.service';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers']);
    userServiceSpy.getAllUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [UsuariosComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inicializa con lista de usuarios vacia', () => {
    expect(component.usuarios).toEqual([]);
  });

  it('llama a getAllUsers en ngOnInit', () => {
    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
  });

  it('carga usuarios desde el servicio', () => {
    const mockUsers = [
      { id: 1, nombre: 'Admin', email: 'admin@lambert.com', rol: 'admin' as const }
    ];
    userServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();
    expect(component.usuarios).toEqual(mockUsers);
  });
});
