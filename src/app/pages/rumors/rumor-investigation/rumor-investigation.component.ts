import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModelRumor} from "../../../models/modelRumor";
import {RumorsService} from "../../../services/rumors.service";
import {AlertService} from "../../../services/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-rumor-investigation',
  templateUrl: './rumor-investigation.component.html',
  styleUrls: ['./rumor-investigation.component.scss']
})
export class RumorInvestigationComponent implements OnInit {
  @Input() rumorToInvestigate: ModelRumor;

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
    alert("Marking "+ this.rumorToInvestigate.suspectName);
    this.rumorsService.updateStatusToWaitingResult(this.rumorToInvestigate.id).subscribe(result=>{
      this.alertService.success(this.translateService.instant('rumor-change-status-success-message'), this.alertOptions)
    }, error => this.alertService.error(this.translateService.instant('rumor-change-status-error-message'), this.alertOptions));
  }
}
