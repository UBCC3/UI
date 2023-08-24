import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCalculationComponent } from './new-calculation.component';

describe('NewCalculationComponent', () => {
  let component: NewCalculationComponent;
  let fixture: ComponentFixture<NewCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCalculationComponent]
    });
    fixture = TestBed.createComponent(NewCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
