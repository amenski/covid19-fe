import { Component, OnInit } from '@angular/core';
import {Case} from '../../../models/case';
import {CasesService} from "../../../services/cases.service";
import {ModelCase} from "../../../models/modelCase";

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  cases: ModelCase[];
  constructor(private casesService: CasesService) {}

  ngOnInit() {
    this.casesService.getAllCases().subscribe(result=>{
      this.cases = result.returnValue.cases;
    })
  }

}
