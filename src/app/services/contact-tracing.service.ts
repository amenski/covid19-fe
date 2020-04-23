import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../helpers/constants";
import {Observable} from "rxjs";
import {ResponseContactTracing} from "../models/responseContactTracing";

@Injectable({
  providedIn: 'root'
})
export class ContactTracingService {

  constructor(private httpClient: HttpClient) { }

  getContactTrace(caseCode: string): Observable<ResponseContactTracing> {
    let traceUrl = BASE_URL + '/v1/contact-trace/'+caseCode;
    return this.httpClient.get<ResponseContactTracing>(traceUrl)
  }
}
