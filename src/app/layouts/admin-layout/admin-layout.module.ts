import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { HealthFacilitiesComponent } from '../../pages/health-facilities/health-facilities.component';
import { FollowUpComponent } from '../../pages/follow-up/follow-up.component';
import { UserComponent } from '../../pages/user/user.component';
import { QuestionnaireComponent } from '../../pages/questionnaire/questionnaire.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HealthFacilityListComponent} from '../../pages/health-facilities/health-facility-list/health-facility-list.component';
import {AddHealthFacilityComponent} from '../../pages/health-facilities/add-health-facility/add-health-facility.component';
import {authInterceptorProviders} from '../../helpers/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    QuestionnaireComponent,
    FollowUpComponent,
    HealthFacilitiesComponent,
    HealthFacilityListComponent,
    AddHealthFacilityComponent
  ],
  providers: [authInterceptorProviders],
})
export class AdminLayoutModule {}
