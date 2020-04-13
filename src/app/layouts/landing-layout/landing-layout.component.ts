import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {

  public sidebarColor: string = "greeen";
  constructor() { }
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
      sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
      mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(color){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() {}

}
