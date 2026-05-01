import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso2ConfiguracionComponent } from './paso2-configuracion';

describe('Paso2Configuracion', () => {
  let component: Paso2ConfiguracionComponent;
  let fixture: ComponentFixture<Paso2ConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paso2ConfiguracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paso2ConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
