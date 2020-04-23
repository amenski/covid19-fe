import {Component, OnInit, ViewChild} from '@angular/core';
import {RumorsService} from "../../../services/rumors.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ModelRumor} from "../../../models/modelRumor";
import {FormGroup} from "@angular/forms";
import {AlertService} from "../../../services/alert.service";
import {NavigationExtras, Router} from "@angular/router";

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
    this.showInvestigate = true;
  }
}
