import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactTracingService} from "../../services/contact-tracing.service";

@Component({
  selector: 'app-contact-tracing',
  templateUrl: './contact-tracing.component.html',
  styleUrls: ['./contact-tracing.component.scss']
})
export class ContactTracingComponent implements OnInit {

  tracingForm: FormGroup;
  /*Alert options*/
  alertOptions = {
    autoClose: false,
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
      .subscribe(result=>{
        this.alertService.success("CASE CONTACTS INFO: "+result.returnValue, this.alertOptions);
    }, error =>  this.alertService.error("Error getting trace", this.alertOptions))
  }

}
