import { Injectable } from '@angular/core';
import {Plainte} from "../controller/models/plainte.model";
import {HttpClient} from "@angular/common/http";
import {Vo} from "../controller/models/vo.model";

@Injectable({
  providedIn: 'root'
})
export class PlaintesService {

  // @ts-ignore
  private _plainte: Plainte;
  private _vo!: Vo;
  private url = 'http://localhost:8036/sgcip/';


  get plainte(): Plainte {
    if (this._plainte == null) {
      this._plainte = new Plainte();
    }
    return this._plainte;
  }

  set plainte(value: Plainte) {
    this._plainte = value;
  }


  get vo(): Vo {
    if (this._vo == null) {
      this._vo = new Vo();
    }
    return this._vo;
  }

  set vo(value: Vo) {
    this._vo = value;
  }

  constructor(private http: HttpClient) {
  }

  ajouterPlainte() {
    this.http.post(this.url + 'plainte/', this.plainte).subscribe(
      data => {
        if (data > 0) {
          alert('saved succesfully !');
        } else alert('voila data  ' + data);
      }, error => {
        alert(error);
      }
    )
  }

  rechercheCritere() {
    return this.http.post(this.url+'plainte/critere', this._vo);
  }

  rechercheNumDordre() {
    return this.http;
  }

  nbrPlainteTraitee() {
    return this.http.get(this.url + 'plainte/status/statusName/traitee');
  }

  nbrPlainteEnCours() {
    return this.http.get(this.url + 'plainte/status/statusName/encours');
  }

  nbrPlaintePasEncore() {
    return this.http.get(this.url + 'plainte/status/statusName/pasencore');
  }

  nbrPlainteDossier(){
    return this.http.get(this.url + 'dossier/');
  }

  nbrTypePlainte() {
    return this.http.get(this.url + 'plainte/type/plainte');
  }

  nbrTypeProposition() {
    return this.http.get(this.url + 'plainte/type/proposition');
  }

  nbrTypeRemarque() {
    return this.http.get(this.url + 'plainte/type/remarque');
  }

  nbrDivCabinet() {
    return this.http.get(this.url + 'plainte/division/ref/Cabinet');
  }

  nbrDivSecGeneral() {
    return this.http.get(this.url + 'plainte/division/ref/secrétariat général');
  }

  nbrDivAffInterieur() {
    return this.http.get(this.url + 'plainte/division/ref/Division des affaires intérieures');
  }

  findAll() {
    return this.http.get<Array<Plainte>>(this.url + 'plainte/');
  }

















}
