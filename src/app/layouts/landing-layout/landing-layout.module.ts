import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingLayoutRoutes } from './landing-layout.routing';
import { LandingLayoutComponent } from './landing-layout.component';
import {HealthFacilitiesComponent} from '../../pages/health-facilities/health-facilities.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [ RouterModule ]
})

export class LandingLayoutModule {}
