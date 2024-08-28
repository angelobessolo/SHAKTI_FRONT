import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIntegralComponent } from './gestion-integral.component';

describe('GestionIntegralComponent', () => {
  let component: GestionIntegralComponent;
  let fixture: ComponentFixture<GestionIntegralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionIntegralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionIntegralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
