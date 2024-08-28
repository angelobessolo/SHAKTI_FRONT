import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionRecursosComponent } from './asignacion-recursos.component';

describe('AsignacionRecursosComponent', () => {
  let component: AsignacionRecursosComponent;
  let fixture: ComponentFixture<AsignacionRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionRecursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
