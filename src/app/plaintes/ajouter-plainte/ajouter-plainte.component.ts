import { StatusService } from './../../services/status.service';
import { DivisionService } from './../../services/division.service';
import { DossierService } from './../../services/dossier.service';
import { Status } from './../../controller/models/status.model';
import { Division } from './../../controller/models/division.model';
import { Dossier } from './../../controller/models/dossier.model';
import { Component, OnInit } from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";

@Component({
  selector: 'app-ajouter-plainte',
  templateUrl: './ajouter-plainte.component.html',
  styleUrls: ['./ajouter-plainte.component.css']
})
export class AjouterPlainteComponent implements OnInit {

  public plainte = new Plainte();
  public dossiers = new Array<Dossier>();
  public divisions = new Array<Division>();
  public statusT = new Array<Status>();
  constructor(
    private plaintesService: PlaintesService,
    private dossierService: DossierService,
    private divisionService: DivisionService,
    private statusService: StatusService
    ){}

  public ajouterPlainte() {
    return this.plaintesService.ajouterPlainte(this.plainte).subscribe(
      data => {
        if (data > 0) {
          alert('saved succesfully !');
        } else alert('voila data  ' + data);
      }, error => {
        alert(error);
      }
    );
  }

  public findAllDossiers(){
    return this.dossierService.findAll().subscribe(
      data => {
        this.dossiers = data;
        console.log(this.dossiers);
      }, error =>{
        console.log(error);
      }
    );
  }

  public findAllDivisions(){
    return this.divisionService.findAll().subscribe(
      data => {
        this.divisions = data;
      }, error =>{
        console.log(error);
      }
    );
  }

  public findAllStatus(){
    return this.statusService.findAll().subscribe(
      data => {
        this.statusT = data ;
      }, error =>{
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.findAllDossiers();
    this.findAllDivisions();
    this.findAllStatus();

  }

}
