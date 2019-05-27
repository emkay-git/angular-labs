import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPopupsComponent } from './shared-popups.component';

describe('SharedPopupsComponent', () => {
  let component: SharedPopupsComponent;
  let fixture: ComponentFixture<SharedPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
