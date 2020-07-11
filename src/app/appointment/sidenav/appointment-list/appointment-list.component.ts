import {Component, Inject, OnInit} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "../../../services/navigation.service";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(@Inject(NAVIGATION_SERVICE) private nav: INavigationService) { }

  ngOnInit(): void {
  }

  goToAdd(): void {
    this.nav.openNewAppointment();
  }

}
