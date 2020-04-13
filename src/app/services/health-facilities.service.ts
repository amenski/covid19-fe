import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../helpers/constants";
import {HealthFacilities} from "../models/health-facilities";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {RequestSaveFacility} from "../models/requestSaveFacility";
import {ResponseBase} from "../models/responseBase";

@Injectable({
  providedIn: 'root'
})
export class HealthFacilitiesService {

  constructor(private httpClient: HttpClient) { }

  getFacilities(): Observable<ResponseHealthFacilityList>{
    let facilitiesUrl = BASE_URL+"/v1/facility";
    // @ts-ignore
    return this.httpClient.get<ResponseHealthFacilityList>(facilitiesUrl);
  }

  createNewFacility(requestSaveFacility: RequestSaveFacility): Observable<ResponseBase>{
    const url = BASE_URL+'/v1/api/facility';
    // let puiCase = {};
    // formData.forEach((value, key) => {
    //   puiCase[key] = value;
    //
    //   console.log(key+" : "+value);
    // });
    // let json = JSON.stringify(puiCase);
    return this.httpClient.put<ResponseBase>(url, requestSaveFacility);
  }


}
