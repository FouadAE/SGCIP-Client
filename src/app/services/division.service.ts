import { Division } from './../controller/models/division.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  
  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Array<Division>>(this.apiServerUrl + 'division/');
  }
}
