import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PlainteDepart} from "../controller/models/plainte-depart.model";

@Injectable({
  providedIn: 'root'
})
export class PlainteDepartService {

  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Array<PlainteDepart>>(this.apiServerUrl + 'plainteDepart/');
  }
}
