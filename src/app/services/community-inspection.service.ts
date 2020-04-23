import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {BASE_URL} from "../helpers/constants";
import {RequestSaveFacility} from "../models/requestSaveFacility";
import {ResponseBase} from "../models/responseBase";
import {ResponsePuiFollowUpSingle} from "../models/responsePuiFollowUpSingle";
import {ResponseCaseSingle} from "../models/responseCaseSingle";
import {RequestSearchCase} from "../models/requestSearchCase";
import {ResponseCaseList} from "../models/responseCaseList";
import {RequestSaveFollowUp} from "../models/requestSaveFollowUp";

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

  getCaseFollowUp(caseCode: string): Observable<ResponsePuiFollowUpSingle>{
    let followUpUrl = BASE_URL+"/v1/follow-up/"+caseCode;
    return this.httpClient.get<ResponsePuiFollowUpSingle>(followUpUrl);
  }

  searchCaseByCriteria(searchCase: RequestSearchCase):  Observable<ResponseCaseList> {
    let followUpUrl = BASE_URL+"/v1/case/";
    return this.httpClient.post<ResponseCaseList>(followUpUrl, searchCase);
  }

  registerNewFollow(requestSaveFollowUp: RequestSaveFollowUp): Observable<ResponseBase>{
    let followUpUrl = BASE_URL+"/v1/api/follow-up/";
    return this.httpClient.put<ResponseBase>(followUpUrl, requestSaveFollowUp);
  }
}
