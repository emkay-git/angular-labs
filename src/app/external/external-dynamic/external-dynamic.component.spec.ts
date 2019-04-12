import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDynamicComponent } from './external-dynamic.component';

describe('ExternalDynamicComponent', () => {
  let component: ExternalDynamicComponent;
  let fixture: ComponentFixture<ExternalDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
