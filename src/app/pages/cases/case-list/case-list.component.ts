import { Component, OnInit } from '@angular/core';
import {Case} from '../../../models/case';
import {CasesService} from "../../../services/cases.service";
import {ModelCase} from "../../../models/modelCase";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  cases: ModelCase[];
  searchVal: string = '';


  constructor(private casesService: CasesService, private router: Router) {}

  ngOnInit() {
    this.casesService.getAllCases().subscribe(result=>{
      this.cases = result.returnValue.cases;
    })
  }

  followUp(modelCase: ModelCase) {
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
        if (selectedCase.caseCode.search(this.searchVal) != -1 ) {
          filteredCases.push(selectedCase);
        }
      }

      this.cases = filteredCases.slice();
    }
  }
}
