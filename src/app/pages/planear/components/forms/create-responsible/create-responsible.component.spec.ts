import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsibleComponent } from './create-responsible.component';

describe('CreateResponsibleComponent', () => {
  let component: CreateResponsibleComponent;
  let fixture: ComponentFixture<CreateResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResponsibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
