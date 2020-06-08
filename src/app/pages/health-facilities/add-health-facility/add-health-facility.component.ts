import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {HealthFacilitiesService} from "../../../services/health-facilities.service";
import {AlertService} from "../../../services/alert.service";
import {RequestSaveFacility} from "../../../models/requestSaveFacility";
import {ModelHealthFacility} from "../../../models/modelHealthFacility";

@Component({
  selector: 'app-add-health-facility',
  templateUrl: './add-health-facility.component.html',
  styleUrls: ['./add-health-facility.component.scss']
})
export class AddHealthFacilityComponent implements OnInit {
  facilityForm: FormGroup;
  /*Alert options*/
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  requestSaveFacilities: RequestSaveFacility;
  facilities: ModelHealthFacility[] = [];

  constructor(public fb: FormBuilder, private facilityService: HealthFacilitiesService,
              private alertService: AlertService) {
    this.facilityForm = this.fb.group({
      osmId: '', name: '',
      amenity: '', addrFull: '',
      xCord: '', yCord: ''
    })
  }

  ngOnInit() {

  }

  addHealthFacility() {

    this.facilities = [{
      // osm_id: this.facilityForm.get('osmId').value,
      name: this.facilityForm.get('name').value,
      amenity: this.facilityForm.get('amenity').value,
      // addrfull: this.facilityForm.get('addrFull').value,
      // xCord:  this.facilityForm.get('xCord').value,
      // yCord: this.facilityForm.get('yCord').value
    }];
    this.requestSaveFacilities.facilities = [];
    // this.requestSaveFacilities.facilities.push(...this.facilities) ;
    this.facilityService.createNewFacility(this.requestSaveFacilities).subscribe(result=>{
      this.alertService.success("Health Facility Registered!", this.options)
    })

  }
}
