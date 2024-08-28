import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliacionSstComponent } from './afiliacion-sst.component';

describe('AfiliacionSstComponent', () => {
  let component: AfiliacionSstComponent;
  let fixture: ComponentFixture<AfiliacionSstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfiliacionSstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiliacionSstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
