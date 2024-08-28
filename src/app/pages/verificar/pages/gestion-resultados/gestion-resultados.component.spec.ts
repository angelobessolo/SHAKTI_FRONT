import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionResultadosComponent } from './gestion-resultados.component';

describe('GestionResultadosComponent', () => {
  let component: GestionResultadosComponent;
  let fixture: ComponentFixture<GestionResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
