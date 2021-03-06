import { Component, OnInit } from '@angular/core';
import {Case} from '../../../models/case';
import {CasesService} from "../../../services/cases.service";
import {ModelCase} from "../../../models/modelCase";
import {NavigationExtras, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {CASE_STATUS_DECEASED_LABEL} from "../../../helpers/constants";

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  cases: ModelCase[];
  searchVal: string = '';

  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  deceasedLabel = CASE_STATUS_DECEASED_LABEL;

  constructor(private casesService: CasesService, private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    this.casesService.getAllCases().subscribe(result=>{
      this.cases = result.returnValue.cases;
    }, error => this.alertService.warn("Error loading case report, Try Logout and Login"));
  }

  followUp(modelCase: ModelCase) {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 30000);
    let navigationExtras: NavigationExtras = {
      state: {
        caseToFollow: modelCase,
      }
    };
    this.router.navigate(['admin/follow-up'], navigationExtras);
  }


  checkSearchVal() {
    let filteredCases: ModelCase[] = [];
    console.log(this.searchVal);
    if (this.searchVal && this.searchVal != '') {

      /*  FOR OF */
      for (let selectedCase of this.cases) {
        if (selectedCase.firstName.search(this.searchVal) != -1 ||
          selectedCase.lastName.search(this.searchVal) != -1) {
          filteredCases.push(selectedCase);
        }
      }

      this.cases = filteredCases.slice();
    }
  }

  ViewDeceasedPatientHistory(dpCase: ModelCase) {
    alert("Under Construction");
  }
}
