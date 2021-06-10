import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Theme} from "../controller/models/theme.model";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';
  constructor(private http: HttpClient) { }

  public findAll(){
    return this.http.get<Array<Theme>>(this.apiServerUrl + 'theme/');
  }
}
