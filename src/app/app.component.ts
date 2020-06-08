import { Component } from "@angular/core";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "black-dashboard-angular";
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'am']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|am/) ? browserLang : 'en');
  }
}
