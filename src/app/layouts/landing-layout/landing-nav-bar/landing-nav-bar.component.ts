import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ROUTES} from "../../../components/sidebar/sidebar.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-landing-nav-bar',
  templateUrl: './landing-nav-bar.component.html',
  styleUrls: ['./landing-nav-bar.component.scss']
})
export class LandingNavBarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  closeResult: string;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal, private translate: TranslateService
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    let navbar = document.getElementsByClassName('navbar')[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add('bg-white');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('bg-white');
      navbar.classList.add('navbar-transparent');
    }
  };
  ngOnInit() {
    window.addEventListener("resize", this.updateColor);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      // this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    this.router.navigate(['/admin/login']);
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  ngOnDestroy(){
    window.removeEventListener("resize", this.updateColor);
  }

}
