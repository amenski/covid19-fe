import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModelRumor} from "../../../models/modelRumor";

@Component({
  selector: 'app-rumor-investigation',
  templateUrl: './rumor-investigation.component.html',
  styleUrls: ['./rumor-investigation.component.scss']
})
export class RumorInvestigationComponent implements OnInit {
  @Input() rumorToInvestigate: ModelRumor;


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

}
