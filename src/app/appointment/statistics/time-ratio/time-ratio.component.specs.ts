import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsTimeComponent } from './appointments-time.component';

describe('AppointmentsTimeComponent', () => {
  let component: AppointmentsTimeComponent;
  let fixture: ComponentFixture<AppointmentsTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
