import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {RumorsService} from "../../../services/rumors.service";
import {RequestSaveRumor} from "../../../models/requestSaveRumor";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-rumor-reporting',
  templateUrl: './rumor-reporting.component.html',
  styleUrls: ['./rumor-reporting.component.scss']
})
export class RumorReportingComponent implements OnInit {

  rumorForm: FormGroup;
  myControl = new FormControl();

  date = new FormControl(new Date());
  fever: 'Yes' | 'No' = 'No';
  cough: 'Yes' | 'No' = 'No';
  headache: 'Yes' | 'No' = 'No';

  genders: string[] = ['Male', 'Female'];
  duration: string[] = ['1 day', '2 days', 'More than 2 days', '1 week', 'More than a week'];
  relation: string[] = ['Family', 'Friend', 'Relative', 'Neighbour', 'Dont want to specify'];

  genderOptions: Observable<string[]>;
  durationOptions: Observable<string[]>;
  relationOptions: Observable<string[]>;
  rumor: RequestSaveRumor;

  /*Alert options*/
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(public fb: FormBuilder, private rumorsService: RumorsService, private alertService: AlertService) {


    this.rumorForm = this.fb.group({
      suspectName: '', gender: '',
      address: '', reportDate: '',
      fever: '', headache: '',
      cough: '', symptomsDuration: '',
      reportingPersonName: '', relationWithSuspect: '',
      phoneNumber1: '', phoneNumber2: '',
    })

  }

  ngOnInit() {

    this.genderOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGender(value))
    );

    this.durationOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDuration(value))
    );

    this.relationOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRelation(value))
    );
  }

  private _filterGender(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.genders.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDuration(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.duration.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterRelation(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.relation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  reportRumor() {
    this.rumor = {
      suspectName: this.rumorForm.get('suspectName').value,
      gender: this.rumorForm.get('gender').value,
      address: this.rumorForm.get('address').value,
      reportDate: this.rumorForm.get('reportDate').value,
      fever: this.rumorForm.get('fever').value,
      headache: this.rumorForm.get('headache').value,
      cough: this.rumorForm.get('cough').value,
      symptomsDuration: this.rumorForm.get('symptomsDuration').value,
      reportingPersonName: this.rumorForm.get('reportingPersonName').value,
      relationWithSuspect: this.rumorForm.get('relationWithSuspect').value,
      phoneNumber1: this.rumorForm.get('phoneNumber1').value,
      phoneNumber2: this.rumorForm.get('phoneNumber2').value,
    }
    this.rumorsService.reportRumor(this.rumor).subscribe(result=>{
      // if(result.message==='error'){
      //   this.alertService.error(result.message, this.options);
      //   return;
      // }
      this.alertService.success("Rumor has been reported, We will get back to you as soon as possible", this.options);
    });
  }

}
