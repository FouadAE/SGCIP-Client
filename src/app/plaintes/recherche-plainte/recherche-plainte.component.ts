import { Vo } from '../../controller/models/vo.model';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";
import { BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Dossier} from "../../controller/models/dossier.model";
import {PlainteDepart} from "../../controller/models/plainte-depart.model";
import {Division} from "../../controller/models/division.model";
import {Instruction} from "../../controller/models/instruction.model";
import {RClass} from "../../controller/models/rclass.model";
import {Status} from "../../controller/models/status.model";
import {Theme} from "../../controller/models/theme.model";
import {StatusService} from "../../services/status.service";
import {PlainteDepartService} from "../../services/plainte-depart.service";
import {RclassService} from "../../services/rclass.service";
import {DivisionService} from "../../services/division.service";
import {ThemeService} from "../../services/theme.service";
import {InstructionService} from "../../services/instruction.service";


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
  public modalRef!: any;
  public modalRefRes!: BsModalRef;
  public title = 'Fiche du Plainte :' ;
  public plainteToModify!: Plainte;
  public modifyOn = false;
  public dossiers!: Array<Dossier>;
  public statusT!: Array<Status>;
  public plaintesDepart!: Array<PlainteDepart>;
  public divisions!: Array<Division>;
  public instructions!: Array<Instruction>;
  public themes!: Array<Theme>;
  public clases!: Array<RClass>;
  public modalRefModify!: BsModalRef;

  constructor(
    private plainteservice: PlaintesService,
    private modalService: BsModalService,
    private statusService: StatusService,
    private plainteDepartService: PlainteDepartService,
    private divisionService: DivisionService,
    private instructionService: InstructionService,
    private themeService: ThemeService,
    private rclassService: RclassService
  ) {

  }

  ngOnInit(): void {
    this.findAllDossiers();
    this.findAllStatus();
    this.findAllPlainteDepart();
    this.findAllDivisions();
    this.findAllInstructions();
    this.findAllThemes();
    this.findAllRClass();
  }

  findBynumeroDordre(index: number){
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
    let i = index;
    this.findBynumeroDordre(i);
  }

  /*******/
  openModalResponse(template: TemplateRef<any>, index: number) {
    this.modalRefRes = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    let i = index;
    this.findBynumeroDordre(i);
  }

  delete(r: Plainte, i: number) {
    this.plainteservice.delete(r.numeroDOrdre).subscribe(
      data => {
        if (data) {
          alert('element deleted successfully !');
          this.resultCritere.splice(i, 1);
          this.modifyOn = false;
        }
      }, error => {
        alert(error);
      }
    );
  }


  modifySave(plainteToModify: Plainte) {
    this.plainteservice.modifyPlainte(plainteToModify).subscribe(
      data => {
        if (data > 0) {
          alert('modification enregistrée avec succées !');
          this.modalRefRes.hide();
        } else {
          alert(data);
        }
      }, error => {
        alert(error);
      }
    );
  }

  findAllDossiers() {
    this.plainteservice.nbrPlainteDossier().subscribe(
      data => {
        this.dossiers = data as Dossier[];
      }
    )
  }

  findAllStatus() {
    this.statusService.findAll().subscribe(
      data => {
        this.statusT = data as Status[];

      }, error => {
        alert(error);
      }
    )
  }

  findAllPlainteDepart() {
    this.plainteDepartService.findAll().subscribe(
      data => {
        this.plaintesDepart = data as PlainteDepart[];
      }, error => {
        alert(error);
      }
    )
  }

  findAllDivisions() {
    this.divisionService.findAll().subscribe(
      data => {
        this.divisions = data as Division[];
      }, error => {
        alert(error);
      }
    )
  }

  findAllInstructions() {
    this.instructionService.findAll().subscribe(
      data => {
        this.instructions = data as Instruction[];
      }, error => {
        alert(error);
      }
    )
  }

  findAllThemes() {
    this.themeService.findAll().subscribe(
      data => {
        this.themes = data as Theme[]
      }, error => {
        alert(error);
      }
    )
  }

  findAllRClass() {
    this.rclassService.findAll().subscribe(
      data => {
        this.clases = data as RClass[];
      }, error => {
        alert(error)
      }
    )
  }

  openModalWithClassModify(templateModifyPlainte: TemplateRef<any>,index:number) {
    this.modalRefModify = this.modalService.show(
      templateModifyPlainte,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    let i = index;
    this.findBynumeroDordre(i);

  }
}
