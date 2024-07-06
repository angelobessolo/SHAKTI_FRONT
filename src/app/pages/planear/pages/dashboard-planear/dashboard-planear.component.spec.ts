import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPlanearComponent } from './dashboard-planear.component';

describe('DashboardPlanearComponent', () => {
  let component: DashboardPlanearComponent;
  let fixture: ComponentFixture<DashboardPlanearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPlanearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPlanearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
