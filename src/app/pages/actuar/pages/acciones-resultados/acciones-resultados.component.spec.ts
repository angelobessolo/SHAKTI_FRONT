import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesResultadosComponent } from './acciones-resultados.component';

describe('AccionesResultadosComponent', () => {
  let component: AccionesResultadosComponent;
  let fixture: ComponentFixture<AccionesResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionesResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
