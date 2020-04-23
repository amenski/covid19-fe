import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {RumorsService} from "../../../services/rumors.service";
import {RequestSaveRumor} from "../../../models/requestSaveRumor";
import {AlertService} from "../../../services/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-rumor-reporting',
  templateUrl: './rumor-reporting.component.html',
  styleUrls: ['./rumor-reporting.component.scss']
})
export class RumorReportingComponent implements OnInit {

  rumorForm: FormGroup;
  myControl = new FormControl();

  date = new FormControl(new Date());
  fever: boolean;
  cough: boolean;
  headache: boolean;

  genders: string[] = ['M', 'F'];
  duration: number[] = [1, 2, 3, 4, 5];
  relation: string[] = ['Family', 'Friend', 'Relative', 'Neighbour', 'Dont want to specify'];

  genderOptions: Observable<string[]>;
  durationOptions: Observable<number[]>;
  relationOptions: Observable<string[]>;
  rumor: RequestSaveRumor;

  /*Alert options*/
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
    loading: boolean = false;
  constructor(public fb: FormBuilder, private rumorsService: RumorsService, private alertService: AlertService,
              public translate: TranslateService) {

    this.rumorForm = this.fb.group({
      suspectName: '', gender: '',
      address: '', reportDate: '',
      fever: '', headache: '',
      cough: '', symptomsDuration: '',
      reportingPersonName: '', relationWithSuspect: '',
      phoneNumber1: '', phoneNumber2: '', status: ''
    })

  }

  ngOnInit() {

    this.genderOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGender(value))
    );

    this.durationOptions = this.myControl.valueChanges.pipe(
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
  private _filterDuration(value: number): number[] {
    return this.duration.filter(option => option === value);
  }
  private _filterRelation(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.relation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  reportRumor() {
    this.loading = false;
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
      status: {id: 1080, value: "PENDING"}
    }
    this.rumorsService.reportRumor(this.rumor).subscribe(result=>{
      // if(result.message==='error'){
      //   this.alertService.error(result.message, this.options);
      //   return;
      // }
      this.alertService.success(this.translate.instant('rumor-success-message'), this.options);
    }, error =>  this.alertService.error(this.translate.instant('rumor-error-message'), this.options));
  }

}
