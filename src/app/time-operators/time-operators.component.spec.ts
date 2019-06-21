import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOperatorsComponent } from './time-operators.component';

describe('TimeOperatorsComponent', () => {
  let component: TimeOperatorsComponent;
  let fixture: ComponentFixture<TimeOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
