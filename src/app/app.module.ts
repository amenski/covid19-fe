import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingLayoutModule } from './layouts/landing-layout/landing-layout.module';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, Configuration, BASE_PATH } from './generated';
import { environment } from 'environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent, LandingLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    ApiModule.forRoot(() => new Configuration({
        apiKeys:{'Authorization': `Bearer ${localStorage.getItem('Authorization')}` }
      }))
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
