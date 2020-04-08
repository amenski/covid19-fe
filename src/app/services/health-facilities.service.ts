import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { HealthFacilityService, ModelHealthFacilityList } from 'app/generated';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthFacilitiesService {

  constructor(private httpClient: HttpClient, private hfacility: HealthFacilityService) { }

  getFacilities(): Observable<ModelHealthFacilityList> {
    return this.hfacility.getAllHealthFacility().pipe(map(response => response.returnValue));
  }
}
