import {Component, Inject, OnInit} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "../../../services/navigation/navigation.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(@Inject(NAVIGATION_SERVICE) private nav: INavigationService) { }

  ngOnInit(): void {
  }

  goBack() {
    this.nav.openAppointments();
  }

}
