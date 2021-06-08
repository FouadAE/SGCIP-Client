import { HttpClient } from '@angular/common/http';
import { Dossier } from './../controller/models/dossier.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Array<Dossier>>(this.apiServerUrl + 'dossier/');
  }
}
