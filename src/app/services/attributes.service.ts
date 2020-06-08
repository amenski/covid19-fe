import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ResponseAttributesList} from "../models/responseAttributesList";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../helpers/constants";

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private http: HttpClient) { }

  getAllAttributes(): Observable<ResponseAttributesList>{
    let attribsUrl = BASE_URL+"/v1/attributes";
    return this.http.get<ResponseAttributesList>(attribsUrl);
  }
}

