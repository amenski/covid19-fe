import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ModelRumor} from "../../../models/modelRumor";
import {RumorsService} from "../../../services/rumors.service";
import {AlertService} from "../../../services/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {
  RUMOR_IN_ISOLATION_STATUS_ID,
  RUMOR_REGISTERED_AS_CASE_STATUS_ID,
  RUMOR_WAITING_RESULT_STATUS_ID
} from "../../../helpers/constants";

@Component({
  selector: 'app-rumor-investigation',
  templateUrl: './rumor-investigation.component.html',
  styleUrls: ['./rumor-investigation.component.scss']
})
export class RumorInvestigationComponent implements OnInit {
  @Input() rumorToInvestigate: ModelRumor;
  @Input() isToBeChangedToWaiting: boolean;
  @Input() isToBeRegistered: boolean;

  /*Alert options*/
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  constructor(private route: ActivatedRoute, private router: Router,
              private rumorsService: RumorsService, private alertService: AlertService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  markRumorApproval() {
    this.rumorsService.updateStatus(this.rumorToInvestigate.id, RUMOR_WAITING_RESULT_STATUS_ID).subscribe(result=>{
      this.alertService.success(this.translateService.instant('rumor-change-status-success-message'), this.alertOptions)
    }, error => this.alertService.error(this.translateService.instant('rumor-change-status-error-message'), this.alertOptions));
  }

  registerRumorAsCase() {
    this.rumorsService.updateStatus(this.rumorToInvestigate.id, RUMOR_REGISTERED_AS_CASE_STATUS_ID).subscribe(result=>{
      this.alertService.success(this.translateService.instant('rumor-change-status-success-message'), this.alertOptions)
    }, error => this.alertService.error(this.translateService.instant('rumor-change-status-error-message'), this.alertOptions));

    let navigationExtras: NavigationExtras = {
      state: {
        rumorToRegister: this.rumorToInvestigate,
      }
    };
    this.router.navigate(['admin/cases'], navigationExtras);

  }

  isolateAndRegisterCase(){
    this.rumorsService.updateStatus(this.rumorToInvestigate.id, RUMOR_IN_ISOLATION_STATUS_ID).subscribe(result=>{
      this.alertService.success(this.translateService.instant('rumor-change-status-success-message'), this.alertOptions)
    }, error => this.alertService.error(this.translateService.instant('rumor-change-status-error-message'), this.alertOptions));

    let navigationExtras: NavigationExtras = {
      state: {
        rumorToRegister: this.rumorToInvestigate,
      }
    };
    this.router.navigate(['admin/cases'], navigationExtras);
  }
}
