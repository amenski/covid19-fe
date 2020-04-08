import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlertComponent } from './alert/alert.component';
import {FixedPluginComponent} from './fixedplugin/fixedplugin.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, AlertComponent, FixedPluginComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, AlertComponent, FixedPluginComponent]
})
export class ComponentsModule {}
