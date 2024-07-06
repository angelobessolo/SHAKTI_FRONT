import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHacerComponent } from './dashboard-hacer.component';

describe('DashboardHacerComponent', () => {
  let component: DashboardHacerComponent;
  let fixture: ComponentFixture<DashboardHacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHacerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
