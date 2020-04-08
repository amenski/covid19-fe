import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  }, {
    path: 'landing',
    component: LandingLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/landing-layout/landing-layout.module#LandingLayoutModule'
  }]}, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}, {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]
