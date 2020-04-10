import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {QuestionControlService} from "../../../services/question-control.service";

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  insertDate= new FormControl(new Date());
  myControl = new FormControl();

  constructor(public fb: FormBuilder, private questionnaireService: QuestionControlService) {
    this.questionsForm = this.fb.group({
      question: '', options: '',
      category: '', parentId: '',
      description: '', modifiedBy: '',
      insertDate: '', modifiedDate: '',


    })
  }

  ngOnInit(): void {
  }

  addQuestion() {
    let formData: any = new FormData();
    formData.append("question", this.questionsForm.get('question').value);
    formData.append("options", this.questionsForm.get('options').value);
    formData.append("category", this.questionsForm.get('category').value);
    formData.append("parentId", this.questionsForm.get('parentId').value);
    formData.append("description", this.questionsForm.get('description').value);
    formData.append("modifiedBy", this.questionsForm.get('modifiedBy').value);
    formData.append("insertDate", this.questionsForm.get('insertDate').value);
    formData.append("modifiedDate", this.questionsForm.get('modifiedDate').value);
  }
}
