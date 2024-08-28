import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesSaludComponent } from './condiciones-salud.component';

describe('CondicionesSaludComponent', () => {
  let component: CondicionesSaludComponent;
  let fixture: ComponentFixture<CondicionesSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondicionesSaludComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondicionesSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
