import { AuthGuardService } from './services/auth-guard.service';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PlainteComponent} from './plaintes/plainte/plainte.component';
import {AjouterPlainteComponent} from './plaintes/ajouter-plainte/ajouter-plainte.component';
import {DashboardPlainteComponent} from './plaintes/dashboard-plainte/dashboard-plainte.component';
import {RecherchePlainteComponent} from './plaintes/recherche-plainte/recherche-plainte.component';
import {StatistiquesPlainteComponent} from './plaintes/statistiques-plainte/statistiques-plainte.component';
import {VisiteComponent} from './visites/visite/visite.component';
import {AjouterVisiteComponent} from './visites/ajouter-visite/ajouter-visite.component';
import {DashboardVisiteComponent} from './visites/dashboard-visite/dashboard-visite.component';
import {RechercheVisiteComponent} from './visites/recherche-visite/recherche-visite.component';
import {StatistiquesVisiteComponent} from './visites/statistiques-visite/statistiques-visite.component';
import {LoginComponent} from './login/login.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharingDataService} from "./services/sharing-data.service";
import { NotificationPlainteComponent } from './plaintes/notification-plainte/notification-plainte.component';
import { NotificationVisiteComponent } from './visites/notification-visite/notification-visite.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import { NoAccesComponent } from './component/no-acces/no-acces.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import {ButtonModule} from "primeng/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {NgxPrintModule} from "ngx-print";
import {ComponentLoaderFactory} from "ngx-bootstrap/component-loader";
import {PositioningService} from "ngx-bootstrap/positioning";

@NgModule({
  declarations: [
    AppComponent,
    PlainteComponent,
    AjouterPlainteComponent,
    DashboardPlainteComponent,
    RecherchePlainteComponent,
    StatistiquesPlainteComponent,
    VisiteComponent,
    AjouterVisiteComponent,
    DashboardVisiteComponent,
    RechercheVisiteComponent,
    StatistiquesVisiteComponent,
    LoginComponent,
    NavbarComponent,
    NotificationPlainteComponent,
    NotificationVisiteComponent,
    WelcomeComponent,
    NoAccesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule,
    NgxPrintModule
  ],
  providers: [SharingDataService, AuthGuardService,BsModalService,ComponentLoaderFactory,ComponentLoaderFactory,PositioningService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
