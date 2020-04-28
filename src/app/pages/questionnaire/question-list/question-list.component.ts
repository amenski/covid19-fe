import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
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
  @Output() messageToEmit = new EventEmitter<Object>();

  questionnaireForm: FormGroup;

  questions: ModelQuestionnaire[];
  checked: boolean = false;
  selectedValue1: string;
  // selectedValue = new Map();

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

  onSelectionChange(qid, quest, opt) {
    this.messageToEmit.emit({id: qid, question: quest, option: opt});
  }

  check() {
    this.checked = true;
  }
}
