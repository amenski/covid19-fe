import {Component, OnInit, ViewChild} from '@angular/core';
import {RumorsService} from "../../../services/rumors.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ModelRumor} from "../../../models/modelRumor";
import {FormGroup} from "@angular/forms";
import {AlertService} from "../../../services/alert.service";
import {NavigationExtras, Router} from "@angular/router";
import {
  RUMOR_IN_ISOLATION_STATUS_LABEL,
  RUMOR_PENDING_STATUS_LABEL, RUMOR_REGISTERED_AS_CASE_STATUS_LABEL,
  RUMOR_WAITING_RESULT_STATUS_LABEL
} from "../../../helpers/constants";
import {ModelCase} from "../../../models/modelCase";

@Component({
  selector: 'app-rumor-list',
  templateUrl: './rumor-list.component.html',
  styleUrls: ['./rumor-list.component.scss']
})
export class RumorListComponent implements OnInit {
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   rumors: ModelRumor[] = [];
   displayedColumns: string[] = ['reportDate', 'suspectName', 'reportingPersonName', 'relationWithSuspect', 'phoneNumber1', 'extra'];

  dataSource: any;
  showInvestigate: boolean = false;
  rumorToInvestigate: ModelRumor;
  isToBeChangedToWaiting: boolean = false;
  isToBeRegistered: boolean;

  waitingResultLabel: string = RUMOR_WAITING_RESULT_STATUS_LABEL;
  pendingLabel: string = RUMOR_PENDING_STATUS_LABEL;
  registeredLabel: string = RUMOR_REGISTERED_AS_CASE_STATUS_LABEL;
  inIsolationLabel: string = RUMOR_IN_ISOLATION_STATUS_LABEL;
  searchVal: string = '';

  constructor(private rumorsService: RumorsService, private alertService: AlertService,
              private router: Router) {
    this.rumorsService.getAllRumors().subscribe(result=>{

      this.rumors = result.returnValue.list;
      this.dataSource =  new MatTableDataSource(this.rumors);
      this.dataSource.sort = this.matSort;
    })

  }

  ngOnInit() {

  }

  investigateRumor(rumor: any) {
    this.rumorToInvestigate = rumor;
    this.isToBeChangedToWaiting = true;
    this.showInvestigate = true;
  }

  reportOrIsolate(rumor: any) {
    this.rumorToInvestigate = rumor;
    this.isToBeRegistered = true;
    this.showInvestigate = true;
  }

  checkSearchVal() {
    let filteredRumor: ModelRumor[] = [];
    console.log(this.searchVal);
    if (this.searchVal && this.searchVal != '') {

      /*  FOR OF */
      for (let selectedRumor of this.rumors) {
        if (selectedRumor.suspectName.search(this.searchVal) != -1 ||
          selectedRumor.reportingPersonName.search(this.searchVal) != -1) {
          filteredRumor.push(selectedRumor);
        }
      }

      this.dataSource = filteredRumor.slice();
    }
  }
}
