import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BASE_URL} from "../helpers/constants";
import {HttpClient} from "@angular/common/http";
import { ModelDailyCaseStatus, DailyStatusService } from 'app/generated';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyStatService {

  constructor(private http: HttpClient, private statusService: DailyStatusService) { }

  getAllCaseStats() {
    return this.statusService.getAllDailyStatus().pipe(map(response => response.returnValue));
  }
}
