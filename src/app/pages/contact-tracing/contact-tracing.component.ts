import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactTracingService} from "../../services/contact-tracing.service";
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-contact-tracing',
  templateUrl: './contact-tracing.component.html',
  styleUrls: ['./contact-tracing.component.scss']
})
export class ContactTracingComponent implements OnInit {
  data: TreeNode[] = [];

  tracingForm: FormGroup;
  /*Alert options*/
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  constructor(private alertService: AlertService, private fb: FormBuilder,
              private contactTracingService: ContactTracingService) {
    this.tracingForm = this.fb.group({
      caseCode: ''
    })
  }

  ngOnInit(): void {
  }

  getContacts(){
    this.contactTracingService.getContactTrace(this.tracingForm.get('caseCode').value)
      .subscribe(result => {
        this.data = []; //clear
        if(result.success) {
          if(result.returnValue) {
            this.data.push(JSON.parse(result.returnValue));
          } else {
            this.alertService.error('No data found.', this.alertOptions);
          }
        } else {
          this.alertService.error('Error: ' + (result.message || result.errors || ''), this.alertOptions);
        }
    }, error =>  this.alertService.error('Error getting data.', this.alertOptions));
  }
}