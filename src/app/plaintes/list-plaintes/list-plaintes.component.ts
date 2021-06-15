import {RclassService} from './../../services/rclass.service';
import {ThemeService} from './../../services/theme.service';
import {InstructionService} from './../../services/instruction.service';
import {DivisionService} from './../../services/division.service';
import {PlainteDepartService} from './../../services/plainte-depart.service';
import {StatusService} from './../../services/status.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PlaintesService} from './../../services/plaintes.service';
import {RClass} from './../../controller/models/rclass.model';
import {Theme} from './../../controller/models/theme.model';
import {Instruction} from './../../controller/models/instruction.model';
import {Division} from './../../controller/models/division.model';
import {PlainteDepart} from './../../controller/models/plainte-depart.model';
import {Status} from './../../controller/models/status.model';
import {Dossier} from './../../controller/models/dossier.model';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Plainte} from './../../controller/models/plainte.model';
import {Component, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-list-plaintes',
  templateUrl: './list-plaintes.component.html',
  styleUrls: ['./list-plaintes.component.css']
})
export class ListPlaintesComponent implements OnInit {

  public plaintes!: Array<Plainte>;
  public listPlaintes!: Array<Plainte>;
  public plainte = new Plainte();
  public modalRef!: any;
  public modalRefRes!: BsModalRef;
  public title = 'Fiche du Plainte :';
  public dossiers!: Array<Dossier>;
  public statusT!: Array<Status>;
  public plaintesDepart!: Array<PlainteDepart>;
  public divisions!: Array<Division>;
  public instructions!: Array<Instruction>;
  public themes!: Array<Theme>;
  public clases!: Array<RClass>;
  public modalRefModify!: BsModalRef;
  public filter = false;

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
    this.findAll();
    this.findAllDossiers();
    this.findAllStatus();
    this.findAllPlainteDepart();
    this.findAllDivisions();
    this.findAllInstructions();
    this.findAllThemes();
    this.findAllRClass();
  }

  findBynumeroDordre(index: number) {
    let numeroDOrdre = this.plaintes[index].numeroDOrdre;
    this.plainteservice.findBynumeroDordre(numeroDOrdre).subscribe(
      data => {
        console.log(data);
        this.plainte = data;
      }, error => {
        console.log(error);
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

  openModalResponse(template: TemplateRef<any>, index: number) {
    this.modalRefRes = this.modalService.show(
      template,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    let i = index;
    this.findBynumeroDordre(i);
  }

  delete(r: Plainte, i: number) {
    this.plainteservice.delete(r.numeroDOrdre).subscribe(
      data => {
        if (data) {
          alert('element deleted successfully !');
          this.plaintes.splice(i, 1);
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

  openModalWithClassModify(templateModifyPlainte: TemplateRef<any>, index: number) {
    this.modalRefModify = this.modalService.show(
      templateModifyPlainte,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    let i = index;
    this.findBynumeroDordre(i);
  }

  findAll() {
    this.plainteservice.findAll().subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.plaintes = data as Plainte[];
          this.listPlaintes = data as Plainte[];
        } else {
          console.log(data);
        }
      }, error => {
        alert(error);
      }
    )
  }

  toggleFilter() {
    this.filter = !this.filter;
  }

  plainteRepondu() {
    this.plaintes = this.listPlaintes.filter( (el) => {
      return el.reponse != null;
    });
  }

  plainteNonRepondu() {
    this.plaintes = this.listPlaintes.filter((el) => {
      return el.reponse == null;
    });
  }
}
