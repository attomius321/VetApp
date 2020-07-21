import {Component, Input, OnInit} from '@angular/core';
import {PieChartService} from "../../../services/chart-creator/pie-chart.service";
import {Observable} from "rxjs";
import {Appointment} from "../../../entities/appointment.model";

@Component({
  selector: 'app-animals-ratio',
  templateUrl: './animals-ratio.component.html',
  styleUrls: ['./animals-ratio.component.css']
})
export class AnimalsRatioComponent implements OnInit {

  @Input() appointments: Observable<Array<Appointment>>;
  private appMap: Map<string,number> = new Map();

  constructor(public pieCreator: PieChartService) {
    this.pieCreator = new PieChartService();
  }

  ngOnInit(): void {
    this.appointments.subscribe(
      appointments => {
        appointments.forEach(appointment => {
          let myAnimalArray = Array.from(this.appMap.keys());
          if(!myAnimalArray.includes(appointment.animal)){
            this.createNewMapValue(appointment.animal);
          } else {
            this.updateMapValue(appointment.animal);
          }
          this.pieCreator.pieChartLabels = myAnimalArray.slice(0,4);
          let myValuesArray = Array.from(this.appMap.values());
          this.pieCreator.pieChartData = myValuesArray.slice(0,4);
        })
      }
    )
  }

  createNewMapValue(key: string){
    this.appMap.set(key, 1);
  }

  updateMapValue(key: string){
    this.appMap.set(key, (this.appMap.get(key)+1));
  }

}
