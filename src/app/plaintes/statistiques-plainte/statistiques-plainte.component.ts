import { Component, OnInit } from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";

@Component({
  selector: 'app-statistiques-plainte',
  templateUrl: './statistiques-plainte.component.html',
  styleUrls: ['./statistiques-plainte.component.css']
})
export class StatistiquesPlainteComponent implements OnInit {

  public nbr!: number;
  public nbrTraitee!: number;
  public nbrEnCours!: number;
  public nbrDossier!: number;
  public plaintes!: Array<Plainte>;


  constructor(private statistiquesService: PlaintesService) {
  }


  ngOnInit(): void {
    this.nombreTotalPlainteFunc();
    this.nombrePlainteTraitee();
    this.nombrePlainteEnCours();
    this.nombrePlainteDossier();
  }

  nombreTotalPlainteFunc() {
    this.statistiquesService.nbrTotalPlainteFunc().subscribe(
      data => {
        this.nbr = Object.keys(data).length;
        this.plaintes = data;
      }, error => {
        alert(error);
      }
    )


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


  nombrePlainteDossier() {
    this.statistiquesService.nbrPlainteDossier().subscribe(
      data => {
        console.log(data);
        this.nbrDossier = Object.keys(data).length;
      }, error => {
        alert('error' + error);
      }
    )
  }



}
