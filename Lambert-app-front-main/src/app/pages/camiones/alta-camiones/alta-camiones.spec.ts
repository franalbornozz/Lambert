import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCamionComponent } from './alta-camiones';

describe('AltaCamionComponent', () => {
  let component: AltaCamionComponent;
  let fixture: ComponentFixture<AltaCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaCamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
