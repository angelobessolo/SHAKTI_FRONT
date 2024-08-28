import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionCopasstComponent } from './capacitacion-copasst.component';

describe('CapacitacionCopasstComponent', () => {
  let component: CapacitacionCopasstComponent;
  let fixture: ComponentFixture<CapacitacionCopasstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitacionCopasstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionCopasstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
