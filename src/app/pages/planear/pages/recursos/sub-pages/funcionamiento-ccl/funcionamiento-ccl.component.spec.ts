import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionamientoCclComponent } from './funcionamiento-ccl.component';

describe('FuncionamientoCclComponent', () => {
  let component: FuncionamientoCclComponent;
  let fixture: ComponentFixture<FuncionamientoCclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionamientoCclComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionamientoCclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
