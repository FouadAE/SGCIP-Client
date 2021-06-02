import { Component, OnInit } from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";
import {Vo} from "../../controller/models/vo.model";


@Component({
  selector: 'app-recherche-plainte',
  templateUrl: './recherche-plainte.component.html',
  styleUrls: ['./recherche-plainte.component.css']
})
export class RecherchePlainteComponent implements OnInit {

  public resultCritere!: Array<Plainte>;
  public findOrNot = true;

  constructor(private plainteservice: PlaintesService) {
  }

  ngOnInit(): void {
  }

  get Vo(): Vo {
    return this.plainteservice.vo;
  }



  rechercheCritere() {
    this.resultCritere = new Array<Plainte>();
    this.plainteservice.rechercheCritere().subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.resultCritere = data as Plainte[];
          this.findOrNot=true;
        } else {
          this.findOrNot = false;
        }
        console.log(data);
      }, error => {
        alert('ha error ' + error);
      }
    );
  }

}
