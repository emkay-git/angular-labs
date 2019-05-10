import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonLoaderComponent } from './non-loader.component';

describe('NonLoaderComponent', () => {
  let component: NonLoaderComponent;
  let fixture: ComponentFixture<NonLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
