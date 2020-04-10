import { Injectable } from '@angular/core';
import {BASE_URL} from "../helpers/constants";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {ResponseQuestionnierList} from "../models/responseQuestionnierList";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor(private httpClient: HttpClient) { }

  getAllQuestions():  Observable<ResponseQuestionnierList>{
    let questionsUrl = BASE_URL+"/v1/questionnier";
    // @ts-ignore
    return this.httpClient.get<ResponseQuestionnierList>(questionsUrl);
  }

}
