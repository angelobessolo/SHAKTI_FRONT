import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVerificarComponent } from './dashboard-verificar.component';

describe('DashboardVerificarComponent', () => {
  let component: DashboardVerificarComponent;
  let fixture: ComponentFixture<DashboardVerificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVerificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVerificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
