import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionesAtelComponent } from './investigaciones-atel.component';

describe('InvestigacionesAtelComponent', () => {
  let component: InvestigacionesAtelComponent;
  let fixture: ComponentFixture<InvestigacionesAtelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigacionesAtelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigacionesAtelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
