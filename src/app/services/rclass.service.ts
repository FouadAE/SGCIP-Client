import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RClass} from "../controller/models/rclass.model";

@Injectable({
  providedIn: 'root'
})
export class RclassService {

  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Array<RClass>>(this.apiServerUrl + 'class/');
  }
}
