import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";


export const LandingLayoutRoutes: Routes = [
  // { path: "", redirectTo:"home", pathMatch: "full"},
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: DashboardComponent},

];
