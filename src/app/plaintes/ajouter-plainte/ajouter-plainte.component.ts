import { Component, OnInit } from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";

@Component({
  selector: 'app-ajouter-plainte',
  templateUrl: './ajouter-plainte.component.html',
  styleUrls: ['./ajouter-plainte.component.css']
})
export class AjouterPlainteComponent implements OnInit {

  constructor(private plaintesService: PlaintesService) {
  }

  get plainte(): Plainte {
    return this.plaintesService.plainte;
  }


  public ajouterPlainte() {
    return this.plaintesService.ajouterPlainte();
  }


  ngOnInit(): void {
  }

}
