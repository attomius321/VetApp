import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
