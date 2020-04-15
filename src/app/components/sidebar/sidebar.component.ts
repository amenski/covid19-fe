import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/admin/cases",
    title: "Covid-19 Cases",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/admin/follow-up",
    title: "Community Inspection",
    icon: "icon-pin",
    class: ""
  },
  {
    path: "/admin/questionnaire",
    title: "Questionnaire",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/admin/rumor-list",
    title: "Rumors Investigation",
    icon: "icon-molecule-40",
    class: ""
  },
  {
    path: "/admin/health-facilities",
    title: "Health Facilities",
    icon: "icon-rumor-10",
    class: ""
  },

  {
    path: "/admin/user",
    title: "User Profile",
    icon: "icon-single-02",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
