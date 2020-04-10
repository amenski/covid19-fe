import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {authInterceptorProviders} from "./helpers/jwt.interceptor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import { AddQuestionsComponent } from './pages/questionnaire/add-questions/add-questions.component';
import { QuestionListComponent } from './pages/questionnaire/question-list/question-list.component';
import {AccordionModule} from "ngx-bootstrap/accordion";



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatDatepickerModule,
    AccordionModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [ NativeDateAdapter],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
