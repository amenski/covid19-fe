import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-add-cases',
  templateUrl: './add-cases.component.html',
  styleUrls: ['./add-cases.component.scss']
})
export class AddCasesComponent implements OnInit {
  form: FormGroup;
  cityName: string;
  country: string;
  model: NgbDateStruct;
  date: { year: number; month: number };
  gender = ['Male', 'Female'];

  myControl = new FormControl();
  regions: string[] =
    ['Addis Ababa', 'Afar Region', 'Amhara Region',
      'Benishangul-Gumuz Region', 'Dire Dawa', 'Gambela Region',
      'Harari Region', 'Oromia Region', 'Somali Region',
      'Southern Nations, Nationalities, and Peoples\' Region', 'Tigray Region'
    ];
  filteredOptions: Observable<string[]>;

  constructor(public fb: FormBuilder, private casesService: CasesService, private calendar: NgbCalendar) {
    this.form = this.fb.group({
      caseCode: '',
      firstName: '',
      lastName: ''
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.regions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  addCase() {
    console.log("Adding a new Case "+ this.form.get('caseCode').value);
    let formData: any = new FormData();
    formData.append("firstName", this.form.get('firstName').value);
    formData.append("lastName", this.form.get('lastName').value);
    this.casesService.createNewCase(formData).subscribe(result=>{
      alert(result);
    })

  }
}
