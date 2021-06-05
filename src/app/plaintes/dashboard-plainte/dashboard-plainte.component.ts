import { Component, OnInit } from '@angular/core';
import {PlaintesService} from "../../services/plaintes.service";
import {Plainte} from "../../controller/models/plainte.model";

@Component({
  selector: 'app-dashboard-plainte',
  templateUrl: './dashboard-plainte.component.html',
  styleUrls: ['./dashboard-plainte.component.css']
})
export class DashboardPlainteComponent implements OnInit {

  data: any;
  private url = 'http://localhost:8036/sgcip/';
  public nbrTraitee!: number;
  public nbrEnCours!: number;
  public nbrPasEncore!: number;
  public nbrPlaintPar = 'status';
  private nbrTypePlainte!: number;
  private nbrTypeProposition!: number;
  private nbrTypeRemarque!: number;
  private nbrDivCabinet!: number;
  private nbrDivSecGeneral!: number;
  private nbrDivAffInterieur!: number;
  public plaintes!: Array<Plainte>;
  public searchBy!: string;

  constructor(private statistiquesService: PlaintesService) {
  }


  ngOnInit() {
    this.nombrePlainteTraitee();
    this.nombrePlaintePasEncore();
    this.nombrePlainteEnCours();
    this.nombreTypePlainte();
    this.nombreTypeProposition();
    this.nombreTypeRemarque();
    this.findAll();
    this.nombreDivCabinet();
    this.nombreDivAffInterieur();
    this.nombreDivSecGeneral();
    setTimeout(() => {
      this.chartFunction()
    }, 500);


  }


  chartFunction() {
    if (this.nbrPlaintPar === 'status') {
      console.log(this.nbrPlaintPar);
      this.data = {
        labels: ['Traitée', 'En Cours', 'Pas Encore'],
        datasets: [
          {
            data: [this.nbrTraitee, this.nbrEnCours, this.nbrPasEncore],
            backgroundColor: [
              "#5aff15",
              "#ff928b",
              "#ec9f05"
            ],
            hoverBackgroundColor: [
              "#00b712",
              "#ffac81",
              "#ff4e00"
            ]
          }]
      };
    } else if (this.nbrPlaintPar === 'type') {
      this.data = {
        labels: ['Plainte', 'Proposition', 'Remarque'],
        datasets: [
          {
            data: [this.nbrTypePlainte, this.nbrTypeProposition, this.nbrTypeRemarque],
            backgroundColor: [
              "#d98324",
              "#ece32d",
              "#83eaf1"
            ],
            hoverBackgroundColor: [
              "#3f0d12",
              "#fce043",
              "#63a4ff"
            ]
          }]
      };

    } else if (this.nbrPlaintPar === 'division') {
      console.log(this.nbrPlaintPar);
      this.data = {
        labels: ['Cabinet', 'Secrétariat Général', 'Division des affaires intérieures'],
        datasets: [
          {
            data: [this.nbrDivCabinet, this.nbrDivSecGeneral, this.nbrDivAffInterieur],
            backgroundColor: [
              "#9cff98",
              "#49f3e4",
              "#6c78bd"
            ],
            hoverBackgroundColor: [
              "#1cf836",
              "#1f9df1",
              "#042cfa"
            ]
          }]
      };


    }
  }

  nombrePlainteTraitee() {

    this.statistiquesService.nbrPlainteTraitee().subscribe(
      data => {
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
  nombreTypePlainte() {
    this.statistiquesService.nbrTypePlainte().subscribe(
      data => {
        this.nbrTypePlainte = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreTypeProposition() {
    this.statistiquesService.nbrTypeProposition().subscribe(
      data => {
        this.nbrTypeProposition = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreTypeRemarque() {
    this.statistiquesService.nbrTypeRemarque().subscribe(
      data => {
        this.nbrTypeRemarque = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreDivCabinet() {
    this.statistiquesService.nbrDivCabinet().subscribe(
      data => {
        this.nbrDivCabinet = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreDivSecGeneral() {
    this.statistiquesService.nbrDivSecGeneral().subscribe(
      data => {
        this.nbrDivSecGeneral = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreDivAffInterieur() {
    this.statistiquesService.nbrDivAffInterieur().subscribe(
      data => {
        this.nbrDivAffInterieur = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  rechercheParNumDordre() {
    if (this.searchBy.length == 0){
      this.findAll();
      return;
    }else {
      this.statistiquesService.rechercheNumDordre().get<Array<Plainte>>(this.url + 'plainte/status/statusName/' + this.searchBy).subscribe(
        data => {
          if (data){
            this.plaintes = data as Plainte[];
          }else {
            alert('Aucune palainte');
          }

        }, error => {
          alert(error);
        }
      )}
  }

  findAll() {
    this.statistiquesService.findAll().subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.plaintes = data as Plainte[];
        } else {
          console.log(data);
        }
      }, error => {
        alert(error);
      }
    )
  }



}
