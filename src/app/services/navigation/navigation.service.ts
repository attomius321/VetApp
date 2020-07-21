import {Inject, Injectable, InjectionToken, Provider} from '@angular/core';
import {Router} from "@angular/router";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../appointment/appointment.service";

export interface INavigationService {
  openNewAppointment(): Promise<boolean>;
  openAppointments(): Promise<boolean>;
  openAppointment(id: string): Promise<boolean>;
}

@Injectable()
export class NavigationService implements INavigationService{

  constructor(private router: Router,
              @Inject(APPOINTMENT_SERVICE) private appointmentService: IAppointmentService) { }

  openNewAppointment(): Promise<boolean> {
    return this.router.navigate(['appointments','add']);
  }

  openAppointments(): Promise<boolean> {
    return this.router.navigate(['appointments']);
  }

  openAppointment(id: string): Promise<boolean> {
    return this.router.navigate(['appointments',id]);
  }

}

export const NAVIGATION_SERVICE = new InjectionToken<INavigationService>("NAVIGATION_SERVICE");

export const NavigationServiceProvider: Provider = {
  useClass: NavigationService,
  provide: NAVIGATION_SERVICE
}
