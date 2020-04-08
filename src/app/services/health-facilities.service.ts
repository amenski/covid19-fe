import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../helpers/constants";
import {HealthFacilities} from "../models/health-facilities";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";

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

  createNewFacility(formData: FormData): Observable<any>{
    const url = BASE_URL+'/v1/facility';
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //   })
    // };
    let puiCase = {};
    formData.forEach((value, key) => {
      puiCase[key] = value;

      console.log(key+" : "+value);
    });
    let json = JSON.stringify(puiCase);
    return this.httpClient.put(url, puiCase);
  }


}
