import {Component, OnInit, ViewChild} from '@angular/core';
import {RumorsService} from "../../../services/rumors.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ModelRumor} from "../../../models/modelRumor";
import {FormGroup} from "@angular/forms";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-rumor-investigation',
  templateUrl: './rumor-list.component.html',
  styleUrls: ['./rumor-list.component.scss']
})
export class RumorListComponent implements OnInit {
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   rumors: ModelRumor[] = [];
   displayedColumns: string[] = ['reportDate', 'suspectName', 'reportingPersonName', 'relationWithSuspect', 'phoneNumber1', 'phoneNumber2', 'extra'];

  dataSource: any;

  constructor(private rumorsService: RumorsService, private alertService: AlertService) {
    this.rumorsService.getAllRumors().subscribe(result=>{

      this.rumors = result.returnValue.list;
      this.dataSource =  new MatTableDataSource(this.rumors);
      this.dataSource.sort = this.matSort;
    })

  }

  ngOnInit() {

  }

}
