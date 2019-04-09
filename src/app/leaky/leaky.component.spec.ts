import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakyComponent } from './leaky.component';

describe('LeakyComponent', () => {
  let component: LeakyComponent;
  let fixture: ComponentFixture<LeakyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeakyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeakyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
