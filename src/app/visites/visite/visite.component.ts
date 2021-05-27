import { Component, OnInit } from '@angular/core';
import {SharingDataService} from "../../services/sharing-data.service";

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.css']
})
export class VisiteComponent implements OnInit {

  message: any;

  constructor(private data: SharingDataService) {
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
  }

}
