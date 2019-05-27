import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSharedPopupsComponent } from './non-shared-popups.component';

describe('NonSharedPopupsComponent', () => {
  let component: NonSharedPopupsComponent;
  let fixture: ComponentFixture<NonSharedPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonSharedPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSharedPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
