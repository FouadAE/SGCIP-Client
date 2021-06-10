import {StatusService} from '../../services/status.service';
import {DivisionService} from '../../services/division.service';
import {DossierService} from '../../services/dossier.service';
import {Status} from '../../controller/models/status.model';
import {Division} from '../../controller/models/division.model';
import {Dossier} from '../../controller/models/dossier.model';
import {Component, OnInit} from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";
import {Theme} from "../../controller/models/theme.model";
import {ThemeService} from "../../services/theme.service";
import {RClass} from "../../controller/models/rclass.model";
import {RclassService} from "../../services/rclass.service";
import {PlainteDepart} from "../../controller/models/plainte-depart.model";
import {PlainteDepartService} from "../../services/plainte-depart.service";
import {Instruction} from "../../controller/models/instruction.model";
import {InstructionService} from "../../services/instruction.service";

@Component({
  selector: 'app-ajouter-plainte',
  templateUrl: './ajouter-plainte.component.html',
  styleUrls: ['./ajouter-plainte.component.css']
})
export class AjouterPlainteComponent implements OnInit {

  public plainte = new Plainte();
  public dossiers = new Array<Dossier>();
  public divisions = new Array<Division>();
  public statusT = new Array<Status>();
  public themes = new Array<Theme>();
  public clases = new Array<RClass>();
  public plaintesDepart = new Array<PlainteDepart>();
  public instructions= new Array<Instruction>();

  constructor(
    private plaintesService: PlaintesService,
    private dossierService: DossierService,
    private divisionService: DivisionService,
    private statusService: StatusService,
    private themeservice: ThemeService,
    private rclassService: RclassService,
    private plainteDepartService: PlainteDepartService,
    private instructionService: InstructionService
  ) {
  }

  public ajouterPlainte() {
    return this.plaintesService.ajouterPlainte(this.plainte).subscribe(
      data => {
        if (data > 0) {
          alert('saved succesfully !');
        } else alert('voila data  ' + data);
      }, error => {
        alert(error);
      }
    );
  }

  public findAllDossiers() {
    return this.dossierService.findAll().subscribe(
      data => {
        this.dossiers = data;
        console.log(this.dossiers);
      }, error => {
        console.log(error);
      }
    );
  }

  public findAllDivisions() {
    return this.divisionService.findAll().subscribe(
      data => {
        this.divisions = data;
      }, error => {
        console.log(error);
      }
    );
  }

  public findAllStatus() {
    return this.statusService.findAll().subscribe(
      data => {
        this.statusT = data;
      }, error => {
        console.log(error);
      }
    );
  }

  public findAllThemes() {
    this.themeservice.findAll().subscribe(
      data => {
        console.log(data);
        this.themes = data as Theme[];
      }, error => {
        console.log(error);
      }
    )
  }

  public findAllRClass() {
    this.rclassService.findAll().subscribe(
      data => {
        console.log(data);
        this.clases = data as RClass[];
      }, error => {
        console.log(error);
      }
    )
  }

  public findAllPlainteDepart() {
    this.plainteDepartService.findAll().subscribe(
      data => {
        console.log(data);
        this.plaintesDepart = data as PlainteDepart[];
      }, error => {
        console.log(error);
      }
    )
  }
  public findAllInstructions() {
    this.instructionService.findAll().subscribe(
      data => {
        console.log(data);
        this.instructions = data as Instruction[];
      }, error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.findAllDossiers();
    this.findAllDivisions();
    this.findAllStatus();
    this.findAllThemes();
    this.findAllRClass();
    this.findAllPlainteDepart();
    this.findAllInstructions();

  }

}
