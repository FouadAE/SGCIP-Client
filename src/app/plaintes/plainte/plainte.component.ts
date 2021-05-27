import {Component, OnInit} from '@angular/core';
import {SharingDataService} from "../../services/sharing-data.service";

@Component({
  selector: 'app-plainte',
  templateUrl: './plainte.component.html',
  styleUrls: ['./plainte.component.css']
})
export class PlainteComponent implements OnInit {

  message: any;

  constructor(private data: SharingDataService) {
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
  }
}
