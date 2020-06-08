import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {JwtInterceptor} from './helpers/jwt.interceptor';

import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import {LandingLayoutModule} from "./layouts/landing-layout/landing-layout.module";


// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AccordionModule} from "primeng";
import {AppOverlayModule} from "./components/overlay/overlay.module";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        MatNativeDateModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatDatepickerModule,
        AccordionModule,
        LandingLayoutModule,
        AppOverlayModule,
    ],
  entryComponents: [AppComponent],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LandingLayoutComponent],
  providers: [
    NativeDateAdapter,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
