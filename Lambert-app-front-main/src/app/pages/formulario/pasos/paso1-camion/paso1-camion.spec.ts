import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso1CamionComponent } from './paso1-camion';

describe('Paso1Camion', () => {
  let component: Paso1CamionComponent;
  let fixture: ComponentFixture<Paso1CamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paso1CamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paso1CamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
