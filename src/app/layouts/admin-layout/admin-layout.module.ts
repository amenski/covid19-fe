import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
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
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NativeDateAdapter} from "@angular/material/core";
import {AddQuestionsComponent} from "../../pages/questionnaire/add-questions/add-questions.component";
import {QuestionListComponent} from "../../pages/questionnaire/question-list/question-list.component";
import {MatIconModule} from "@angular/material/icon";
import {AdminDashboardComponent} from "../../pages/admin-dashboard/admin-dashboard.component";
import {ComponentsModule} from "../../components/components.module";
import {AlertModule} from "../../components/alert/alert.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {RumorListComponent} from "../../pages/rumors/rumor-list/rumor-list.component";
import {ScreeningComponent} from "../../pages/screening/screening.component";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {TranslateModule} from "@ngx-translate/core";
import {RumorInvestigationComponent} from "../../pages/rumors/rumor-investigation/rumor-investigation.component";
import {ContactTracingComponent} from "../../pages/contact-tracing/contact-tracing.component";
import {MatExpansionModule} from "@angular/material/expansion";
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeModule } from 'primeng/tree';
import {AccordionModule, ButtonModule, ProgressSpinnerModule, RadioButtonModule} from "primeng";
import {ProgressSpinnerComponent} from "../../components/progress-spinner/progress-spinner.component";


@NgModule({
  imports: [
    OrganizationChartModule,
    TreeModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatDatepickerModule,
    MatIconModule,
    ComponentsModule,
    AlertModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    TranslateModule,

    MatExpansionModule,
    AccordionModule,
    RadioButtonModule,
    ButtonModule,
    ProgressSpinnerModule,

  ],
  declarations: [
    AdminDashboardComponent,
    UserComponent,
    QuestionnaireComponent,
    CasesComponent,
    CaseListComponent,
    AddCasesComponent,
    ContactTracingComponent,
    RumorInvestigationComponent,
    FollowUpComponent,
    HealthFacilitiesComponent,
    HealthFacilityListComponent,
    AddHealthFacilityComponent,
    AddQuestionsComponent,
    QuestionListComponent,
    RumorListComponent,
    ScreeningComponent,
    ProgressSpinnerComponent
  ],
  providers: [ NativeDateAdapter],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminLayoutModule {}
