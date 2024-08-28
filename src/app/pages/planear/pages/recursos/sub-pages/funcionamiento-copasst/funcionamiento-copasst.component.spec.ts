import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionamientoCopasstComponent } from './funcionamiento-copasst.component';

describe('FuncionamientoCopasstComponent', () => {
  let component: FuncionamientoCopasstComponent;
  let fixture: ComponentFixture<FuncionamientoCopasstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionamientoCopasstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionamientoCopasstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
