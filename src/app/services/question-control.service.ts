import { Injectable } from '@angular/core';
import {BASE_URL} from "../helpers/constants";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {ResponseQuestionnierList} from "../models/responseQuestionnierList";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ResponseBase} from "../models/responseBase";
import {RequestSaveQuestionnier} from "../models/requestSaveQuestionnier";


@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor(private httpClient: HttpClient) { }

  getAllQuestions():  Observable<ResponseQuestionnierList>{
    let questionsUrl = BASE_URL+"/v1/questionnaire/all";
    // @ts-ignore
    return this.httpClient.get<ResponseQuestionnierList>(questionsUrl);
  }

  addQuestion(requestSaveQuestionnier: RequestSaveQuestionnier): Observable<ResponseBase> {
    let questionsUrl = BASE_URL+"/v1/api/questionnaire";
    return this.httpClient.put<ResponseBase>(questionsUrl, requestSaveQuestionnier)
  }
}
