import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, Configuration, BASE_PATH } from './generated';
import { environment } from 'environments/environment';
import {ComponentsModule} from './components/components.module';


@NgModule({
  declarations: [
    AppComponent, AdminLayoutComponent, LandingLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ComponentsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
    ApiModule.forRoot(() => new Configuration({
        apiKeys: {'Authorization': `Bearer ${localStorage.getItem('Authorization')}` }
      }))
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
