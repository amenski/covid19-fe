import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { LandingLayoutRoutes } from "./landing-layout.routing.js";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CasesComponent } from "../../pages/cases/cases.component";
import { HealthFacilitiesComponent } from "../../pages/health-facilities/health-facilities.component";
import { FollowUpComponent } from "../../pages/follow-up/follow-up.component";
import { UserComponent } from "../../pages/user/user.component";
import { QuestionnaireComponent } from "../../pages/questionnaire/questionnaire.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LandingNavBarComponent } from './landing-nav-bar/landing-nav-bar.component';
import { RumorReportingComponent } from './rumor-reporting/rumor-reporting.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    LandingNavBarComponent,
    RumorReportingComponent,
  ],
  providers: [],
  exports: [
    LandingNavBarComponent
  ]
})
export class LandingLayoutModule {}
