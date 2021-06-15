import {PlainteDepart} from "./plainte-depart.model";
import {Division} from "./division.model";
import {Theme} from "./theme.model";
import {Dossier} from "./dossier.model";
import {RClass} from "./rclass.model";
import {Status} from "./status.model";
import {Instruction} from "./instruction.model";

export class Plainte {
  public ref!: string;
  public createdAt!: Date;
  public datePlainte!: Date;
  public objet!: Date;
  public publie!: string
  public dateEnvoi!: Date;
  public numeroEnvoi!: number;
  public numeroDOrdre!: number;
  public observation!: string;
  public source!: string;
  public type!: string;
  public visa!: boolean;
  public expediteur!: string;
  public reponse!: string;
  public plainteDepart = new PlainteDepart();
  public division = new Division();
  public instruction = new Instruction();
  public theme = new Theme();
  public dossier = new Dossier();
  public status = new Status();
  public pClasse = new RClass();
}
