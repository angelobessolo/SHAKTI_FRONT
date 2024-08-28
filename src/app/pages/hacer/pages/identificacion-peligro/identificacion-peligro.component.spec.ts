import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionPeligroComponent } from './identificacion-peligro.component';

describe('IdentificacionPeligroComponent', () => {
  let component: IdentificacionPeligroComponent;
  let fixture: ComponentFixture<IdentificacionPeligroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificacionPeligroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificacionPeligroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
