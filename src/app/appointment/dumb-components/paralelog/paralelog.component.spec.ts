import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParalelogComponent } from './paralelog.component';

describe('ParalelogComponent', () => {
  let component: ParalelogComponent;
  let fixture: ComponentFixture<ParalelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParalelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParalelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
