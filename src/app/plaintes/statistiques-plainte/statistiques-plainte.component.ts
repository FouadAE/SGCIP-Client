import {Component, OnInit, TemplateRef} from '@angular/core';
import {Plainte} from "../../controller/models/plainte.model";
import {PlaintesService} from "../../services/plaintes.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Dossier} from "../../controller/models/dossier.model";
import {Status} from "../../controller/models/status.model";
import {PlainteDepart} from "../../controller/models/plainte-depart.model";
import {Division} from "../../controller/models/division.model";
import {Instruction} from "../../controller/models/instruction.model";
import {Theme} from "../../controller/models/theme.model";
import {RClass} from "../../controller/models/rclass.model";
import {StatusService} from "../../services/status.service";
import {PlainteDepartService} from "../../services/plainte-depart.service";
import {DivisionService} from "../../services/division.service";
import {InstructionService} from "../../services/instruction.service";
import {ThemeService} from "../../services/theme.service";
import {RclassService} from "../../services/rclass.service";

@Component({
  selector: 'app-statistiques-plainte',
  templateUrl: './statistiques-plainte.component.html',
  styleUrls: ['./statistiques-plainte.component.css']
})
export class StatistiquesPlainteComponent implements OnInit {

  data: any;
  public title = 'Fiche du Plainte :';
  public nbrTraitee!: number;
  public nbrEnCours!: number;
  public nbrPasEncore!: number;
  public nbrPlaintPar = 'status';
  private nbrTypePlainte!: number;
  private nbrTypeProposition!: number;
  private nbrTypeRemarque!: number;
  private nbrDivCabinet!: number;
  private nbrDivSecGeneral!: number;
  private nbrDivAffInterieur!: number;
  public plaintes!: Array<Plainte>;
  public searchBy!: string;
  public modalRef!: any;
  public modalRefRes!: BsModalRef;
  public modalRefModify!: BsModalRef;
  plainte!: Plainte;
  public dossiers!: Array<Dossier>;
  public statusT!: Array<Status>;
  public plaintesDepart!: Array<PlainteDepart>;
  public instructions!: Array<Instruction>;
  public divisions!: Array<Division>;
  public clases!: Array<RClass>;
  public themes!: Array<Theme>;

  constructor(
    private statistiquesService: PlaintesService,
    private modalService:BsModalService,
    private statusService: StatusService,
    private plainteDepartService: PlainteDepartService,
    private divisionService: DivisionService,
    private instructionService: InstructionService,
    private themeService: ThemeService,
    private rclassService: RclassService
  ) {
  }


  ngOnInit() {
    this.nombrePlainteTraitee();
    this.nombrePlaintePasEncore();
    this.nombrePlainteEnCours();
    this.nombreTypePlainte();
    this.nombreTypeProposition();
    this.nombreTypeRemarque();
    this.findAll();
    this.nombreDivCabinet();
    this.nombreDivAffInterieur();
    this.nombreDivSecGeneral();
    this.findAllDossiers();
    this.findAllStatus();
    this.findAllPlainteDepart();
    this.findAllDivisions();
    this.findAllInstructions();
    this.findAllThemes();
    this.findAllRClass();
    setTimeout(() => {
      this.chartFunction()
    }, 500);
  }

  chartFunction() {
    if (this.nbrPlaintPar === 'status') {
      console.log(this.nbrPlaintPar);
      this.data = {
        labels: ['Traitée', 'En Cours', 'Pas Encore'],
        datasets: [
          {
            data: [this.nbrTraitee, this.nbrEnCours, this.nbrPasEncore],
            backgroundColor: [
              "#5aff15",
              "#ff928b",
              "#ec9f05"
            ],
            hoverBackgroundColor: [
              "#00b712",
              "#ffac81",
              "#ff4e00"
            ]
          }]
      };
    } else if (this.nbrPlaintPar === 'type') {
      this.data = {
        labels: ['Plainte', 'Proposition', 'Remarque'],
        datasets: [
          {
            data: [this.nbrTypePlainte, this.nbrTypeProposition, this.nbrTypeRemarque],
            backgroundColor: [
              "#d98324",
              "#ece32d",
              "#83eaf1"
            ],
            hoverBackgroundColor: [
              "#3f0d12",
              "#fce043",
              "#63a4ff"
            ]
          }]
      };

    } else if (this.nbrPlaintPar === 'division') {
      console.log(this.nbrPlaintPar);
      this.data = {
        labels: ['Cabinet', 'Secrétariat Général', 'Division des affaires intérieures'],
        datasets: [
          {
            data: [this.nbrDivCabinet, this.nbrDivSecGeneral, this.nbrDivAffInterieur],
            backgroundColor: [
              "#9cff98",
              "#49f3e4",
              "#6c78bd"
            ],
            hoverBackgroundColor: [
              "#1cf836",
              "#1f9df1",
              "#042cfa"
            ]
          }]
      };
    }
  }

  nombrePlainteTraitee() {
    this.statistiquesService.nbrPlainteTraitee().subscribe(
      data => {
        this.nbrTraitee = Object.keys(data).length;
      }, error => {
        alert('error' + error);
      }
    )
  }

  nombrePlainteEnCours() {
    this.statistiquesService.nbrPlainteEnCours().subscribe(
      data => {
        console.log(data);
        this.nbrEnCours = Object.keys(data).length;
      }, error => {
        alert('error' + error);
      }
    )
  }

  nombrePlaintePasEncore() {
    this.statistiquesService.nbrPlaintePasEncore().subscribe(
      data => {
        console.log(data);
        this.nbrPasEncore = Object.keys(data).length;
      }, error => {
        alert('error' + error);
      }
    )
  }

  nombreTypePlainte() {
    this.statistiquesService.nbrTypePlainte().subscribe(
      data => {
        this.nbrTypePlainte = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreTypeProposition() {
    this.statistiquesService.nbrTypeProposition().subscribe(
      data => {
        this.nbrTypeProposition = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreTypeRemarque() {
    this.statistiquesService.nbrTypeRemarque().subscribe(
      data => {
        this.nbrTypeRemarque = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreDivCabinet() {
    this.statistiquesService.nbrDivCabinet().subscribe(
      data => {
        this.nbrDivCabinet = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreDivSecGeneral() {
    this.statistiquesService.nbrDivSecGeneral().subscribe(
      data => {
        this.nbrDivSecGeneral = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  nombreDivAffInterieur() {
    this.statistiquesService.nbrDivAffInterieur().subscribe(
      data => {
        this.nbrDivAffInterieur = Object.keys(data).length;
      }, error => {
        alert(error);
      }
    )
  }

  rechercheParNumDordre() {
    if (this.searchBy.length == 0){
      this.findAll();
      return;
    }else {
      this.statistiquesService.rechercheNumDordre(this.searchBy).subscribe(
        data => {
          if (data){
            this.plaintes = data as Plainte[];
          }else {
            alert('Aucune palainte');
          }
        }, error => {
          alert(error);
        }
      )}
  }

  findAll() {
    this.statistiquesService.findAll().subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.plaintes = data as Plainte[];
        } else {
          console.log(data);
        }
      }, error => {
        alert(error);
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
  findBynumeroDordre(index: number){
    let numeroDOrdre = this.plaintes[index].numeroDOrdre;
    this.statistiquesService.findBynumeroDordre(numeroDOrdre).subscribe(
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
    this.statistiquesService.delete(r.numeroDOrdre).subscribe(
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
    this.statistiquesService.modifyPlainte(plainteToModify).subscribe(
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
    this.statistiquesService.nbrPlainteDossier().subscribe(
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


}
