import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConfiguracionComponent } from './dashboard-configuracion.component';

describe('DashboardConfiguracionComponent', () => {
  let component: DashboardConfiguracionComponent;
  let fixture: ComponentFixture<DashboardConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConfiguracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
