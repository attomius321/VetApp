import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneRatioComponent } from './done-ratio.component';

describe('DoneRatioComponent', () => {
  let component: DoneRatioComponent;
  let fixture: ComponentFixture<DoneRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
