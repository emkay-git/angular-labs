import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusablePopupComponent } from './reusable-popup.component';

describe('ReusablePopupComponent', () => {
  let component: ReusablePopupComponent;
  let fixture: ComponentFixture<ReusablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
