import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsAnimalsComponent } from './appointments-animals.component';

describe('AppointmentsAnimalsComponent', () => {
  let component: AppointmentsAnimalsComponent;
  let fixture: ComponentFixture<AppointmentsAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
