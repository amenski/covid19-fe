import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {QuestionControlService} from "../../../services/question-control.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {ModelEnumIdValue} from "../../../models/modelEnumIdValue";
import {Option} from "../../../models/option";
import {RequestSaveQuestionnier} from "../../../models/requestSaveQuestionnier";
import {AlertService} from "../../../services/alert.service";
import {AttributesService} from "../../../services/attributes.service";
import {ModelAttribute} from "../../../models/modelAttribute";
import {RequestSaveQuestionnaire} from "../../../models/requestSaveQuestionnaire";
import get = Reflect.get;

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  insertDate= new FormControl(new Date());
  /*Alert options*/
  alertOptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  categories = ["PUI_INFO", "SYMPTOMS", "EXISTING_CONDITION"];

  arrayItems: Option[] = [];
  firstOption: Option;
  requestSaveQuestion: RequestSaveQuestionnaire;
  questionnaireControl = new FormControl();
  categoryOptions: Observable<string[]>;
  constructor(public fb: FormBuilder, private questionnaireService: QuestionControlService,
              private alertService: AlertService, private attributesService: AttributesService) {
    this.questionsForm = this.fb.group({
      question: '', options: this.fb.array([]),
      category: '', parentId: '',
      description: '', modifiedBy: '',
      insertDate: '', modifiedDate: '',
    })
  }
  attributes: ModelAttribute[];

  get options() {
    return this.questionsForm.get('options') as FormArray;
  }

  ngOnInit() {
   // this.addOption({id: 0, title: "Option ", addDisabled: true, removeDisabled: true});
    this.categoryOptions = this.questionnaireControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategory(value))
    );

    this.attributesService.getAllAttributes().subscribe(result=>{
      this.attributes = result.returnValue.attributes;
    });

  }

  getAttribute(name: string): ModelAttribute{
    let attr;
    attr =  this.attributes.filter(attr => attr.attName===name);
    return attr;
  }


  addQuestion() {
    // let formData: any = new FormData();
    // formData.append("question", this.questionsForm.get('question').value);
    // formData.append("options", this.questionsForm.get('options').value);
    // formData.append("category", this.questionsForm.get('category').value);
    // formData.append("parentId", this.questionsForm.get('parentId').value);
    // formData.append("description", this.questionsForm.get('description').value);
    // formData.append("modifiedBy", this.questionsForm.get('modifiedBy').value);
    // formData.append("insertDate", this.questionsForm.get('insertDate').value);
    // formData.append("modifiedDate", this.questionsForm.get('modifiedDate').value);


    alert("Category: "+this.getAttribute('PUI_INFO'));

    this.requestSaveQuestion = {
      question: this.questionsForm.get('question').value,
      options: this.questionsForm.get('options').value,
      // category:  this.questionsForm.get('category').value,
      category: {id: 1040, value: this.questionsForm.get('category').value},
      parentId:  this.questionsForm.get('parentId').value,
      description:  this.questionsForm.get('description').value,
      modifiedBy:  this.questionsForm.get('modifiedBy').value,
      insertDate:  this.questionsForm.get('insertDate').value,
      modifiedDate:  this.questionsForm.get('modifiedDate').value,
    }
    this.questionnaireService.addQuestion(this.requestSaveQuestion).subscribe(result=>{
      this.alertService.success("Question Added!", this.options)

    });
  }


  private _filterCategory(value: string) {
    const filterValue = value.toLowerCase();
    return this.categories;
  }

  removeOption(arrayItem: Option) {
    this.arrayItems.pop();
    this.options.removeAt(this.options.length - 1);
  }

  addOption(option: Option) {
    this.arrayItems.push(option);
    this.options.push(this.fb.control(false));
  }
}
