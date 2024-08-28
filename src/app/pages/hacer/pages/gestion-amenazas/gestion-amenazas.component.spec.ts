import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAmenazasComponent } from './gestion-amenazas.component';

describe('GestionAmenazasComponent', () => {
  let component: GestionAmenazasComponent;
  let fixture: ComponentFixture<GestionAmenazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAmenazasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAmenazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
