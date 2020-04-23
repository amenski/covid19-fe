import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {QuestionControlService} from "../../../services/question-control.service";
import {catchError, map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {ModelEnumIdValue} from "../../../models/modelEnumIdValue";
import {Option} from "../../../models/option";
import {RequestSaveQuestionnier} from "../../../models/requestSaveQuestionnier";
import {AlertService} from "../../../services/alert.service";
import {AttributesService} from "../../../services/attributes.service";
import {ModelAttribute} from "../../../models/modelAttribute";
import {RequestSaveQuestionnaire} from "../../../models/requestSaveQuestionnaire";
import get = Reflect.get;
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

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
    autoClose: true,
    keepAfterRouteChange: false
  };
  categories = ["PUI_INFO", "SYMPTOMS", "EXISTING_CONDITION"];

  arrayItems: string[] = [];
  index: number = 0; /*to dynamically assign form control names to options*/
  requestSaveQuestion: RequestSaveQuestionnaire;
  questionnaireControl = new FormControl();
  categoryOptions: Observable<string[]>;

  attributes: ModelAttribute[];
  last: number;
  private returnUrl: any;
  ngOnInit() {
   // this.addOption({id: 0, title: "Option ", addDisabled: true, removeDisabled: true});
    this.categoryOptions = this.questionnaireControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategory(value))
    );

    this.attributesService.getAllAttributes().subscribe(result=>{
      this.attributes = result.returnValue.attributes;
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin/questionnaire';
  }

  private _filterCategory(value: string) {
    const filterValue = value.toLowerCase();
    return this.categories;
  }

  constructor(public fb: FormBuilder, private questionnaireService: QuestionControlService,
              private alertService: AlertService, private attributesService: AttributesService,
              private router: Router,     private route: ActivatedRoute) {
    this.questionsForm = this.fb.group({
      question: '', options: new FormArray([new FormControl('')]),
      category: '', parentId: '',
      description: '', modifiedBy: '',
      insertDate: '', modifiedDate: '',
    })
    // this.addOption(0);
  }

  get options(): FormArray {
    return this.questionsForm.get('options') as FormArray;
  }

  removeOption() {
    this.arrayItems.pop();
    this.options.removeAt(this.options.length - 1);
  }

  addOption(i: any) {
    this.last = i;
    // if(i>=1){
    //   alert("options"+ this.options.at(i).value);
    // }
    this.options.push(this.fb.control(false));
    this.arrayItems.push(this.options.at(i).value);
  }

  addQuestion() {
    this.addOption(this.last+1);
    // this.arrayItems.map(item=>{
    //   alert("Options: "+item);
    // })

    this.requestSaveQuestion = {
      question: this.questionsForm.get('question').value,
      options: this.arrayItems,
      // category:  this.questionsForm.get('category').value,
      category: {id: 1040},
      parentId:  this.questionsForm.get('parentId').value,
      description:  this.questionsForm.get('description').value,
      modifiedBy:  this.questionsForm.get('modifiedBy').value,
      insertDate:  this.questionsForm.get('insertDate').value,
      modifiedDate:  this.questionsForm.get('modifiedDate').value,
    }
    this.questionnaireService.addQuestion(this.requestSaveQuestion).subscribe(result=>{
      this.alertService.success("Question Added!", this.alertOptions)
    }, err => this.alertService.error("Error Creating Question!", this.alertOptions));
    this.questionsForm.reset();
    this.router.navigate([this.returnUrl])
  }
}
