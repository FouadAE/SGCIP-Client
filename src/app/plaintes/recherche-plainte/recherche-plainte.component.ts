import { Vo } from '../../controller/models/vo.model';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";
import { BsModalService} from "ngx-bootstrap/modal";


@Component({
  selector: 'app-recherche-plainte',
  templateUrl: './recherche-plainte.component.html',
  styleUrls: ['./recherche-plainte.component.css']
})
export class RecherchePlainteComponent implements OnInit {

  public vo = new Vo();
  public resultCritere!: Array<Plainte>;
  public findOrNot = true;
  public plainte = new Plainte();
  modalRef!: any;


  constructor(private plainteservice: PlaintesService,private modalService:BsModalService) {
  }

  ngOnInit(): void {
  }

  rechercheCritere() {
    this.resultCritere = new Array<Plainte>();
    if (this.vo.endDate == null && this.vo.startDate == null && this.vo.status == null && this.vo.type == null && this.vo.numeroDOrdre == null)
      return;
    this.plainteservice.rechercheCritere(this.vo).subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.resultCritere = data as Plainte[];
          this.findOrNot = true;
        } else {
          this.findOrNot = false;
        }
      }, error => {
        alert('error' + error);
      }
    );
  }



  openModalWithClass(template: TemplateRef<any>, index: number) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    let numeroDOrdre = this.resultCritere[index].numeroDOrdre;
    this.plainteservice.findBynumeroDordre(numeroDOrdre).subscribe(
      data => {
        console.log(data);
        this.plainte = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
