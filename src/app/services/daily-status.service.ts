import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Case} from "../models/case";
import {BASE_URL} from "../helpers/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DailyStatus} from "../models/daily-status";
import {ResponseDailyCaseStatusList} from "../models/responseDailyCaseStatusList";

@Injectable({
  providedIn: 'root'
})
export class DailyStatusService {

  constructor(private http: HttpClient) { }
  getAllCaseStats(): Observable<ResponseDailyCaseStatusList>{
    let dailyStatUrl = BASE_URL+"/v1/daily-status/all";
    // let he = new HttpHeaders()
    // let headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*'
    // });

    const headers = {
      'Access-Control-Allow-Origin': true
    };
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Allow-Origin': 'true',
    //   })
    // };

    // @ts-ignore
    return this.http.get<ResponseDailyCaseStatusList>(dailyStatUrl, headers);
  }
}
