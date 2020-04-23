import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuestionControlService} from "../../../services/question-control.service";
import {ModelQuestionnier} from "../../../models/modelQuestionnier";
import {ModelQuestionnaire} from "../../../models/modelQuestionnaire";
import {AttributesService} from "../../../services/attributes.service";
import {ModelAttribute} from "../../../models/modelAttribute";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  questionnaireForm: FormGroup;

  questions: ModelQuestionnaire[];
  checked: boolean = false;

  constructor(private fb: FormBuilder, private questionControlService: QuestionControlService){
    this.questionnaireForm = this.fb.group({
      options: ''
    })
  }
  ngOnInit() {

    this.questionControlService.getAllQuestions().subscribe(result=>{
      this.questions = result.returnValue.questions;
    });
  }

  check() {
    this.checked = true;
  }
}
