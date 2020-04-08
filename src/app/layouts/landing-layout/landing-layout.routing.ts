import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {HealthFacilitiesComponent} from '../../pages/health-facilities/health-facilities.component';
import {AuthGuard} from '../../helpers/auth.guard';

export const LandingLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'health-facilities', component: HealthFacilitiesComponent, canActivate: [AuthGuard]},
];
