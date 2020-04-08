import { Component, OnInit } from '@angular/core';
import {HealthFacilitiesService} from "../../../services/health-facilities.service";
import {HealthFacilities} from "../../../models/health-facilities";
import {ModelHealthFacility} from "../../../models/modelHealthFacility";

@Component({
  selector: 'app-health-facility-list',
  templateUrl: './health-facility-list.component.html',
  styleUrls: ['./health-facility-list.component.scss']
})
export class HealthFacilityListComponent implements OnInit {
  facilities: ModelHealthFacility[];
  constructor(private healthFacilitiesService: HealthFacilitiesService) { }

  ngOnInit() {
    this.healthFacilitiesService.getFacilities().subscribe(result=>{
      this.facilities = result.returnValue.facilities;
    })

  }

}
