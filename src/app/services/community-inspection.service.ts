import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {BASE_URL} from "../helpers/constants";
import {RequestSaveFacility} from "../models/requestSaveFacility";
import {ResponseBase} from "../models/responseBase";
import {ResponsePuiFollowUpSingle} from "../models/responsePuiFollowUpSingle";

@Injectable({
  providedIn: 'root'
})
export class CommunityInspectionService {

  constructor(private httpClient: HttpClient) { }

  getPUIByCaseCode(caseCode: string): Observable<ResponsePuiFollowUpSingle>{
    let followUpUrl = BASE_URL+"/v1/follow-up/"+caseCode;
    // @ts-ignore
    return this.httpClient.get<ResponsePuiFollowUpSingle>(followUpUrl);
  }

  // createNewFacility(requestSaveFacility: RequestSaveFacility): Observable<ResponseBase>{
  //   const url = BASE_URL+'/v1/api/facility';
  //   // let puiCase = {};
  //   // formData.forEach((value, key) => {
  //   //   puiCase[key] = value;
  //   //
  //   //   console.log(key+" : "+value);
  //   // });
  //   // let json = JSON.stringify(puiCase);
  //   return this.httpClient.put<ResponseBase>(url, requestSaveFacility);
  // }
}
