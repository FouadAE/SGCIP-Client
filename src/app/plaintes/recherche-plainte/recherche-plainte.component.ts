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
  private createddatebetween: any = {startdate: null, enddate: null};

  constructor(private plainteservice: PlaintesService) {
  }

  ngOnInit(): void {
  }

  get Vo(): Vo {
    return this.plainteservice.vo;
  }

  checkResultCritere(){
    if(Object.keys(this.resultCritere).length > 0){
      this.findOrNot = true;
    }else{
      this.findOrNot = false;
    }
  }

  rechercheCritere() {
    this.resultCritere = new Array<Plainte>();
    this.plainteservice.rechercheCritere().subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.resultCritere = data as Plainte[];
        }
      }, error => {
        alert('ha error ' + error);
      }
    );
  }

  findByCreatedDateBetween(){
    const {startdate, enddate} = this.createddatebetween;
    this.plainteservice.findByCreatedDateBetween(startdate, enddate).subscribe(
      data =>{
        let result = data as Plainte[];
        if(Object.keys(this.resultCritere).length > 0){
          this.resultCritere = this.resultCritere.filter((el) => result.includes(el));
        }else{
          this.resultCritere = result;
        }
      }, error =>{
        console.log(error);
      }
    )
  }

  lancerRecherche(){
    this.rechercheCritere;
    this.findByCreatedDateBetween;
    this.checkResultCritere;
  }
}
