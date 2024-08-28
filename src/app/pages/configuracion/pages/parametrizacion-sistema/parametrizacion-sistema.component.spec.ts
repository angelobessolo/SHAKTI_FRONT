import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrizacionSistemaComponent } from './parametrizacion-sistema.component';

describe('ParametrizacionSistemaComponent', () => {
  let component: ParametrizacionSistemaComponent;
  let fixture: ComponentFixture<ParametrizacionSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrizacionSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrizacionSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
