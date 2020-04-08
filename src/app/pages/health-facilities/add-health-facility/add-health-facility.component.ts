import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {HealthFacilitiesService} from "../../../services/health-facilities.service";

@Component({
  selector: 'app-add-health-facility',
  templateUrl: './add-health-facility.component.html',
  styleUrls: ['./add-health-facility.component.scss']
})
export class AddHealthFacilityComponent implements OnInit {
  facilityForm: FormGroup;

  constructor(public fb: FormBuilder, private facilityService: HealthFacilitiesService ) {
    this.facilityForm = this.fb.group({
      osmId: '', name: '',
      amenity: '', addrFull: '',
      xCord: '', yCord: ''
    })
  }

  ngOnInit() {
  }

  addHealthFacility() {
    let formData: any = new FormData();
    formData.append("osmId", this.facilityForm.get('osmId').value);
    formData.append("name", this.facilityForm.get('name').value);
    formData.append("amenity", this.facilityForm.get('amenity').value);
    formData.append("addrFull", this.facilityForm.get('addrFull').value);
    formData.append("xCord", this.facilityForm.get('xCord').value);
    formData.append("yCord", this.facilityForm.get('yCord').value);
    this.facilityService.createNewFacility(formData).subscribe(result=>{
      alert("Health Facility Registered" +result);
    })

  }
}
