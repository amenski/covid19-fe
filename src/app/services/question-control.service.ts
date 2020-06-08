import { Injectable } from '@angular/core';
import {BASE_URL} from "../helpers/constants";
import {ResponseHealthFacilityList} from "../models/responseHealthFacilityList";
import {ResponseQuestionnierList} from "../models/responseQuestionnierList";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResponseBase} from "../models/responseBase";
import {RequestSaveQuestionnier} from "../models/requestSaveQuestionnier";
import {ResponseQuestionnaireList} from "../models/responseQuestionnaireList";
import {RequestSaveQuestionnaire} from "../models/requestSaveQuestionnaire";


@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor(private httpClient: HttpClient) { }

  getAllQuestions():  Observable<ResponseQuestionnaireList>{
    let params = new HttpParams();
    params = params.append('page', '2');
    let questionsUrl = BASE_URL+"/v1/questionnaire/all";
    return this.httpClient.get<ResponseQuestionnaireList>(questionsUrl, {params: params});
  }

  addQuestion(requestSaveQuestionnier: RequestSaveQuestionnaire): Observable<ResponseBase> {
    let questionsUrl = BASE_URL+"/v1/api/questionnaire";
    return this.httpClient.put<ResponseBase>(questionsUrl, requestSaveQuestionnier)
  }
}
