import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Instruction} from "../controller/models/instruction.model";

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  private apiServerUrl = environment.apiBaseUrl +'api/sgcip/';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Array<Instruction>>(this.apiServerUrl + 'instruction/');
  }
}
