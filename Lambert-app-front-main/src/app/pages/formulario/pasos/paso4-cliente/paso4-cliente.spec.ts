import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso4ClienteComponent } from './paso4-cliente';

describe('Paso4Cliente', () => {
  let component: Paso4ClienteComponent;
  let fixture: ComponentFixture<Paso4ClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paso4ClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paso4ClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
