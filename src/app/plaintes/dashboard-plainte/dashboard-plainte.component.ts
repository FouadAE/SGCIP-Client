import { Component, OnInit } from '@angular/core';
import {PlaintesService} from "../../services/plaintes.service";

@Component({
  selector: 'app-dashboard-plainte',
  templateUrl: './dashboard-plainte.component.html',
  styleUrls: ['./dashboard-plainte.component.css']
})
export class DashboardPlainteComponent implements OnInit {

  data: any;
  public nbrTraitee!: number;
  public nbrEnCours!: number;
  public nbrPasEncore!: number;

  constructor(private statistiquesService: PlaintesService) {
  }

  chartFunction() {
    this.data = {
      labels: ['traitée', 'en cours', 'pas encore'],
      datasets: [
        {
          data: [this.nbrTraitee, this.nbrEnCours, this.nbrPasEncore],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }

  ngOnInit() {
    this.nombrePlainteTraitee();
    this.nombrePlaintePasEncore();
    this.nombrePlainteEnCours();
    setTimeout(() => {
      this.chartFunction()
    }, 500);


  }



  nombrePlainteTraitee() {

    this.statistiquesService.nbrPlainteTraitee().subscribe(
      data => {
        console.log(data);
        this.nbrTraitee = Object.keys(data).length;

      }, error => {
        alert('error' + error);
      }
    )
  }

  nombrePlainteEnCours() {
    this.statistiquesService.nbrPlainteEnCours().subscribe(
      data => {
        console.log(data);
        this.nbrEnCours = Object.keys(data).length;
      }, error => {
        alert('error' + error);
      }
    )
  }
  nombrePlaintePasEncore() {
    this.statistiquesService.nbrPlaintePasEncore().subscribe(
      data => {
        console.log(data);
        this.nbrPasEncore = Object.keys(data).length;
      }, error => {
        alert('error' + error);
      }
    )
  }


}
