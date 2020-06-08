import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuestionControlService} from "../../../services/question-control.service";
import {ModelQuestionnier} from "../../../models/modelQuestionnier";
import {ModelQuestionnaire} from "../../../models/modelQuestionnaire";
import {AttributesService} from "../../../services/attributes.service";
import {ModelAttribute} from "../../../models/modelAttribute";
import {AlertService} from "../../../services/alert.service";

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
  today: Date = new Date();
  optionIsDate: boolean = false;

  constructor(private fb: FormBuilder, private questionControlService: QuestionControlService,
              private alertService: AlertService){
    this.questionnaireForm = this.fb.group({
      options: ''
    })
  }
  ngOnInit() {

    this.questionControlService.getAllQuestions().subscribe(result=>{
      this.questions = result.returnValue.questions;
    }, error => this.alertService.warn("Error Loading Questionnaire! Couldn't connect to Server. Check your connection"));
  }

  onSelectionChange(qid, quest, opt) {
    // if(opt==='date'){
    //   alert("optDate: "+ opt);
    //   this.optionIsDate = true;
    //   this.messageToEmit.emit({id:qid, question: quest, option: opt})
    //
    // }
    // this.optionIsDate = false;
    this.messageToEmit.emit({id: qid, question: quest, option: opt});
  }

  check() {
    this.checked = true;
  }
}
