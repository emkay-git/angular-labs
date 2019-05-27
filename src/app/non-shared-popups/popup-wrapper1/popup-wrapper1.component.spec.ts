import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWrapper1Component } from './popup-wrapper1.component';

describe('PopupWrapper1Component', () => {
  let component: PopupWrapper1Component;
  let fixture: ComponentFixture<PopupWrapper1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupWrapper1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupWrapper1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
