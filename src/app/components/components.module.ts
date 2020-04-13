import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AlertComponent } from './alert/alert.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import { LandingNavbarComponent } from './landing-navbar/landing-navbar.component';


@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, AccordionModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, AlertComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, AlertComponent]
})
export class ComponentsModule {}
