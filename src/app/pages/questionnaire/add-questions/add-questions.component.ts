import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {QuestionControlService} from "../../../services/question-control.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {ModelEnumIdValue} from "../../../models/modelEnumIdValue";
import {Option} from "../../../models/option";
import {RequestSaveQuestionnier} from "../../../models/requestSaveQuestionnier";

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  insertDate= new FormControl(new Date());
  categories =  {
    "category": [
      {
        "id": "1040",
        "value": "PUI_INFO"
      },
      {
        "id": "1041",
        "value": "SYMPTOMS"
      },
      {
        "id": "1042",
        "value": "EXISTING_CONDITION"
      }
    ]
  }
  arrayItems: Option[] = [];
  firstOption: Option;
  requestSaveQuestion: RequestSaveQuestionnier;
  questionnaireControl = new FormControl();
  categoryOptions: Observable<({ id: string; value: string } | { id: string; value: string } | { id: string; value: string })[]>;
  constructor(public fb: FormBuilder, private questionnaireService: QuestionControlService) {
    this.questionsForm = this.fb.group({
      question: '', options: this.fb.array([], this.minInputFields()),
      category: '', parentId: '',
      description: '', modifiedBy: '',
      insertDate: '', modifiedDate: '',
    })
  }

  get options() {
    return this.questionsForm.get('options') as FormArray;
  }

  ngOnInit() {
   // this.addOption({id: 0, title: "Option ", addDisabled: true, removeDisabled: true});
    this.categoryOptions = this.questionnaireControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategory(value))
    );
  }

  minInputFields(): ValidatorFn {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalCount = formArray.controls.map(control => control.value).reduce((prev, next) => next ? prev + next : prev, 0);
      return totalCount >= 1 ? null : {notSelected: true};
    };
    return validator;
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
    //alert("Options: "+this.questionsForm.get('options').value.toString());
    //alert("Category: "+this.questionsForm.get('category').value.toString());
    this.requestSaveQuestion = {
      question: this.questionsForm.get('question').value,
      options: this.questionsForm.get('options').value,
      category:  this.questionsForm.get('category').value,
      parentId:  this.questionsForm.get('parentId').value,
      description:  this.questionsForm.get('description').value,
      modifiedBy:  this.questionsForm.get('modifiedBy').value,
      insertDate:  this.questionsForm.get('insertDate').value,
      modifiedDate:  this.questionsForm.get('modifiedDate').value,
    }
    this.questionnaireService.addQuestion(this.requestSaveQuestion).subscribe(result=>{
      alert(result.message);
    });
  }


  private _filterCategory(value: string) {
    const filterValue = value.toLowerCase();
    return this.categories.category;
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
