import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BASE_URL} from "../helpers/constants";
import {ResponseBase} from "../models/responseBase";
import {HttpClient} from "@angular/common/http";
import {ResponseRumorList} from "../models/responseRumorList";
import {RequestSaveRumor} from "../models/requestSaveRumor";

@Injectable({
  providedIn: 'root'
})
export class RumorsService {


  constructor(private httpClient: HttpClient) { }

  getAllRumors():  Observable<ResponseRumorList>{
    let rumorsUrl = BASE_URL+"/v1/api/rumor";

    return this.httpClient.get<ResponseRumorList>(rumorsUrl);
  }

  reportRumor(requestSaveRumor: RequestSaveRumor): Observable<ResponseBase> {
    let rumorsUrl = BASE_URL+"/v1/rumor";
    return this.httpClient.put<ResponseBase>(rumorsUrl, requestSaveRumor)
  }
}
