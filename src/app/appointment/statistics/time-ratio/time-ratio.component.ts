import {Component, Inject, Input, OnInit} from '@angular/core';
import {Appointment} from "../../../entities/appointment.model";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../services/appointment/appointment.service";
import {TimeConverterService} from "../../../services/time-convertor/time-convertor.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-time-ratio',
  templateUrl: './time-ratio.component.html',
  styleUrls: ['./time-ratio.component.css']
})
export class TimeRatioComponent implements OnInit {

  @Input() appointments: Observable<Array<Appointment>>;
  myArray: Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0];

  constructor(@Inject(APPOINTMENT_SERVICE) private appService: IAppointmentService,
              private converterService: TimeConverterService) {
  }

  public barChartColors = [{
    backgroundColor: 'rgba(42,187,155,0.5)',
    borderColor: 'rgba(225,10,24,0.2)',
    pointBackgroundColor: 'rgba(225,10,24,0.2)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(225,10,24,0.2)'
  }];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: Array<number> = [];
  public barChartDataSet = [{
    data: this.barChartData, label: 'Nr. programari in timp'
  }]

  ngOnInit() {
    this.appointments.pipe(
      map(appArr => appArr.map(app => app.unix)),
      map(unixArr => unixArr.map( unix => this.converterService.convertUnixToDate(unix).getMonth()))
    ).subscribe(month => {
      for(let i=0; i<month.length; i++){
        this.myArray[month[i]]++;
      }
      this.barChartData = this.myArray;
    })
  }


}
