import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Case} from '../models/case';
import {BASE_URL} from "../helpers/constants";
import {ResponseCaseList} from "../models/responseCaseList";
import {RequestSaveCase} from "../models/requestSaveCase";
import {ResponseBase} from "../models/responseBase";

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  getAllCases(): Observable<ResponseCaseList>{
    let casesUrl = BASE_URL+"/v1/api/case/all";
    return this.http.get<ResponseCaseList>(casesUrl);
  }

  createNewCase(requestData: RequestSaveCase): Observable<ResponseBase>{
    const url = BASE_URL+'/v1/api/case';
    return this.http.put<ResponseBase>(url, requestData);
  }

  updateTestResult(caseCode: string, resultId: string): Observable<ResponseBase>{
    const updateUrl = BASE_URL + '/v1/api/case/'+ caseCode+ '/update-result';
    return this.http.post<ResponseBase>(updateUrl, resultId);
  }
}
