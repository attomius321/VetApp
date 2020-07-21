import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {INavigationService, NAVIGATION_SERVICE} from "../../services/navigation/navigation.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title="VetApp";
  constructor(public auth: AuthService,
              @Inject(NAVIGATION_SERVICE) private navService: INavigationService) { }

  ngOnInit(): void {
  }

  goToAppointments(){
    this.navService.openAppointments();
  }

}
