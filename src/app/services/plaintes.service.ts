import { Plainte } from '../controller/models/plainte.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vo} from "../controller/models/vo.model";

@Injectable({
  providedIn: 'root'
})
export class PlaintesService {

  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';

  constructor(private http: HttpClient) {
  }

  ajouterPlainte(plainte: Plainte) {
    return this.http.post(this.apiServerUrl + 'plainte/', plainte);
  }

  rechercheCritere(vo: Vo) {
    return this.http.post(this.apiServerUrl+'plainte/critere', vo);
  }

  rechercheNumDordre(searchBy: any) {
    return this.http.get<Array<Plainte>>(this.apiServerUrl + 'plainte/status/statusName/' + searchBy);
  }

  nbrPlainteTraitee() {
    return this.http.get(this.apiServerUrl + 'plainte/status/statusName/traitee');
  }

  nbrPlainteEnCours() {
    return this.http.get(this.apiServerUrl + 'plainte/status/statusName/encours');
  }

  nbrPlaintePasEncore() {
    return this.http.get(this.apiServerUrl + 'plainte/status/statusName/pasencore');
  }

  nbrPlainteDossier(){
    return this.http.get(this.apiServerUrl + 'dossier/');
  }

  nbrTypePlainte() {
    return this.http.get(this.apiServerUrl + 'plainte/type/plainte');
  }

  nbrTypeProposition() {
    return this.http.get(this.apiServerUrl + 'plainte/type/proposition');
  }

  nbrTypeRemarque() {
    return this.http.get(this.apiServerUrl + 'plainte/type/remarque');
  }

  nbrDivCabinet() {
    return this.http.get(this.apiServerUrl + 'plainte/division/ref/Cabinet');
  }

  nbrDivSecGeneral() {
    return this.http.get(this.apiServerUrl + 'plainte/division/ref/secrétariat général');
  }

  nbrDivAffInterieur() {
    return this.http.get(this.apiServerUrl + 'plainte/division/ref/Division des affaires intérieures');
  }

  findAll() {
    return this.http.get<Array<Plainte>>(this.apiServerUrl + 'plainte/');
  }

  findBynumeroDordre(index: number){
    return this.http.get<Plainte>(this.apiServerUrl + 'plainte/numeroDOrdre'+ index);
  }

}
