import { Component, OnInit } from '@angular/core';
import {HealthFacilitiesService} from '../../../services/health-facilities.service';
import { ModelHealthFacilityList } from 'app/generated/model/models';

@Component({
  selector: 'app-health-facility-list',
  templateUrl: './health-facility-list.component.html',
  styleUrls: ['./health-facility-list.component.scss']
})
export class HealthFacilityListComponent implements OnInit {
  facilities: ModelHealthFacilityList;
  constructor(private healthFacilitiesService: HealthFacilitiesService) { }

  ngOnInit() {
    this.healthFacilitiesService.getFacilities().subscribe(result => {
      this.facilities = result;
    })

  }

}
