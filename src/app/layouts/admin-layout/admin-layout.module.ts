import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CasesComponent } from "../../pages/cases/cases.component";
import { HealthFacilitiesComponent } from "../../pages/health-facilities/health-facilities.component";
import { FollowUpComponent } from "../../pages/follow-up/follow-up.component";
import { UserComponent } from "../../pages/user/user.component";
import { QuestionnaireComponent } from "../../pages/questionnaire/questionnaire.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {CaseListComponent} from "../../pages/cases/case-list/case-list.component";
import {AddCasesComponent} from "../../pages/cases/add-cases/add-cases.component";
import {HealthFacilityListComponent} from "../../pages/health-facilities/health-facility-list/health-facility-list.component";
import {AddHealthFacilityComponent} from "../../pages/health-facilities/add-health-facility/add-health-facility.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
//import {authInterceptorProviders} from "../../helpers/jwt.interceptor";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {NativeDateAdapter} from "@angular/material/core";
import {AddQuestionsComponent} from "../../pages/questionnaire/add-questions/add-questions.component";
import {QuestionListComponent} from "../../pages/questionnaire/question-list/question-list.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatAutocompleteModule,
        ScrollingModule,
        MatDatepickerModule,
    ],
  declarations: [
    DashboardComponent,
    UserComponent,
    QuestionnaireComponent,
    CasesComponent,
    CaseListComponent,
    AddCasesComponent,
    FollowUpComponent,
    HealthFacilitiesComponent,
    HealthFacilityListComponent,
    AddHealthFacilityComponent,
    AddQuestionsComponent,
    QuestionListComponent
  ],
  providers: [ NativeDateAdapter],
})
export class AdminLayoutModule {}
