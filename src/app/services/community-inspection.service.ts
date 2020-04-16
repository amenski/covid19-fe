import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {BASE_URL} from "../helpers/constants";
import {RequestSaveFacility} from "../models/requestSaveFacility";
import {ResponseBase} from "../models/responseBase";
import {ResponsePuiFollowUpSingle} from "../models/responsePuiFollowUpSingle";
import {ResponseCaseSingle} from "../models/responseCaseSingle";

@Injectable({
  providedIn: 'root'
})
export class CommunityInspectionService {

  constructor(private httpClient: HttpClient) { }

  getPUIByCaseCode(caseCode: string): Observable<ResponseCaseSingle>{
    let followUpUrl = BASE_URL+"/v1/case/";
    let params = new HttpParams();
    params = params.append('code', caseCode);
    return this.httpClient.get<ResponseCaseSingle>(followUpUrl,{params: params})
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
