import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Case} from '../models/case';
import {BASE_URL} from "../helpers/constants";
import {RequestSaveCase} from '../generated';
import {ResponseCaseList} from "../models/responseCaseList";

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  getAllCases(): Observable<ResponseCaseList>{
    let casesUrl = BASE_URL+"/v1/case/all";
    // let headers = {
    //     'Access-Control-Allow-Origin': true
    //   };
    // @ts-ignore
    return this.http.get<ResponseCaseList>(casesUrl);
  }
  // createNewCase(formData: FormData): Observable<any>{
  //     const url = BASE_URL+'/v1/api/case';
  //     // const httpOptions = {
  //     //   headers: new HttpHeaders({
  //     //     'Content-Type':  'application/json',
  //     //   })
  //     // };
  //     let puiCase = {};
  //     formData.forEach((value, key) => {
  //       puiCase[key] = value;
  //
  //       console.log(key+" : "+value);
  //     });
  //     let json = JSON.stringify(puiCase);
  //     return this.http.put(url, puiCase);
  // }

  createNewCase(requestData: RequestSaveCase): Observable<any>{
    const url = BASE_URL+'/v1/api/case';
    return this.http.put(url, requestData);
  }
}
