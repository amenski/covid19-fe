import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Case} from "../models/case";
import {BASE_URL} from "../helpers/constants";
import {HttpClient} from "@angular/common/http";
import {DailyStatus} from "../models/daily-status";

@Injectable({
  providedIn: 'root'
})
export class DailyStatusService {

  constructor(private http: HttpClient) { }
  getAllCaseStats(): Observable<DailyStatus[]>{
    let dailyStatUrl = BASE_URL+"/v1/daily-status/all";
    let headers = {
      'Access-Control-Allow-Origin': true
    };
    // @ts-ignore
    return this.http.get<DailyStatus[]>(dailyStatUrl);
  }
}
