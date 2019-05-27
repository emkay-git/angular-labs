import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWrapper2Component } from './popup-wrapper2.component';

describe('PopupWrapper2Component', () => {
  let component: PopupWrapper2Component;
  let fixture: ComponentFixture<PopupWrapper2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupWrapper2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupWrapper2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
