import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertService} from "../../services/alert.service";
import {CommunityInspectionService} from "../../services/community-inspection.service";
import {ResponsePuiFollowUpSingle} from "../../models/responsePuiFollowUpSingle";
import {ModelPuiFollowUp} from "../../models/modelPuiFollowUp";

@Component({
  selector: "app-follow-up",
  templateUrl: "follow-up.component.html",
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {

  followupForm: FormGroup;
  /*Alert options*/
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  caseFollowUp: ModelPuiFollowUp;

  constructor(public fb: FormBuilder, private alertService: AlertService,
              private communityInspectionService: CommunityInspectionService) {
    this.followupForm = this.fb.group({
      searchTerm: '',
      criteria: ''
    });
  }

  showSearchResult: boolean = false;
  searchCriteria: 'Case code' | 'Region'| 'Result' | 'Status' | 'Recent Travel' = 'Case code';

  ngOnInit() {}

  SearchPUI() {
    this.communityInspectionService.getPUIByCaseCode(this.followupForm.get('caseCode').value).subscribe(result=>{
        this.caseFollowUp = result.returnValue;
      }
    );
    this.alertService.success("Follow Up", this.options);
    this.showSearchResult = true;

  }
}
