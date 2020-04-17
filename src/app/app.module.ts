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
//import {authInterceptorProviders, JwtInterceptor} from './helpers/jwt.interceptor';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {JwtInterceptor} from './helpers/jwt.interceptor';
import { AddQuestionsComponent } from './pages/questionnaire/add-questions/add-questions.component';
import { QuestionListComponent } from './pages/questionnaire/question-list/question-list.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import {LandingLayoutModule} from "./layouts/landing-layout/landing-layout.module";
import { RumorListComponent } from './pages/rumors/rumor-list/rumor-list.component';
import { ScreeningComponent } from './pages/screening/screening.component';
import { RumorInvestigationComponent } from './pages/rumors/rumor-investigation/rumor-investigation.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

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
        AccordionModule.forRoot(),
        LandingLayoutModule
    ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LandingLayoutComponent, RumorInvestigationComponent],
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
