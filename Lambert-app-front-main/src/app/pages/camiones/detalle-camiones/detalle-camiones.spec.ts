import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamionDetalleComponent } from './detalle-camiones';

describe('CamionDetalleComponent', () => {
  let component: CamionDetalleComponent;
  let fixture: ComponentFixture<CamionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamionDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
