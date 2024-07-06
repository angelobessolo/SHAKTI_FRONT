import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActuarComponent } from './dashboard-actuar.component';

describe('DashboardActuarComponent', () => {
  let component: DashboardActuarComponent;
  let fixture: ComponentFixture<DashboardActuarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardActuarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardActuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
