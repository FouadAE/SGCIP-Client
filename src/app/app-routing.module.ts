import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PlainteComponent} from "./plaintes/plainte/plainte.component";
import {DashboardPlainteComponent} from "./plaintes/dashboard-plainte/dashboard-plainte.component";
import {AjouterPlainteComponent} from "./plaintes/ajouter-plainte/ajouter-plainte.component";
import {RecherchePlainteComponent} from "./plaintes/recherche-plainte/recherche-plainte.component";
import {StatistiquesPlainteComponent} from "./plaintes/statistiques-plainte/statistiques-plainte.component";
import {NotificationPlainteComponent} from "./plaintes/notification-plainte/notification-plainte.component";
import {LoginComponent} from "./login/login.component";
import {VisiteComponent} from "./visites/visite/visite.component";
import {DashboardVisiteComponent} from "./visites/dashboard-visite/dashboard-visite.component";
import {AjouterVisiteComponent} from "./visites/ajouter-visite/ajouter-visite.component";
import {StatistiquesVisiteComponent} from "./visites/statistiques-visite/statistiques-visite.component";
import {NotificationVisiteComponent} from "./visites/notification-visite/notification-visite.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: 'plainte',
    component: PlainteComponent,
    children: [
      {
        path: 'dashboard-plainte',
        component: DashboardPlainteComponent
      },
      {
        path: 'ajouter-plainte',
        component: AjouterPlainteComponent
      },
      {
        path: 'recherche-plainte',
        component: RecherchePlainteComponent
      },
      {
        path: 'statistiques-plainte',
        component: StatistiquesPlainteComponent
      },
      {
        path: 'notification-palinte',
        component: NotificationPlainteComponent
      }
    ]
  },
  {
    path: 'visite',
    component: VisiteComponent,
    children: [
      {
        path: 'dashboard-visite',
        component: DashboardVisiteComponent
      },
      {
        path: 'ajouter-visite',
        component: AjouterVisiteComponent
      },
      {
        path: 'recherche-plainte',
        component: RecherchePlainteComponent
      },
      {
        path: 'statistiques-visite',
        component: StatistiquesVisiteComponent
      },
      {
        path: 'notification-visite',
        component: NotificationVisiteComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
