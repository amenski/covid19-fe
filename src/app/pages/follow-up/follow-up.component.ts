import { Component, OnInit, Input } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../services/alert.service";
import {CommunityInspectionService} from "../../services/community-inspection.service";
import {ResponsePuiFollowUpSingle} from "../../models/responsePuiFollowUpSingle";
import {ModelPuiFollowUp} from "../../models/modelPuiFollowUp";
import {ModelCase} from "../../models/modelCase";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AttributesService} from "../../services/attributes.service";
import {ModelAttribute} from "../../models/modelAttribute";
import {ModelEnumIdValue} from "../../models/modelEnumIdValue";
import {RequestSearchCase} from "../../models/requestSearchCase";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestSaveFollowUp} from "../../models/requestSaveFollowUp";
import {CasesService} from "../../services/cases.service";

@Component({
  selector: "app-follow-up",
  templateUrl: "follow-up.component.html",
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {

  loading = false;
  followupForm: FormGroup;
  /*Alert options*/
  caseInfo: ModelCase;
  puiFollowUp: ModelPuiFollowUp;

  showByCodeSearchResult: boolean = false;
  showByOtherSearchResult: boolean = false;
  searchCriteria: 'Case code' | 'Other' = 'Other';

  myControl = new FormControl();
  region: string[] =
    ['Addis Ababa', 'Afar Region', 'Amhara Region',
      'Benishangul-Gumuz Region', 'Dire Dawa', 'Gambela Region',
      'Harari Region', 'Oromia Region', 'Somali Region',
      'Southern Nations, Nationalities, and Peoples\' Region', 'Tigray Region'
    ];
  country = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
    "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, " +
    "Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island",
    "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
    "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
    "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo",
    "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao",
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland",
    "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea",
    "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras",
    "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man",
    "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao",
    "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of",
    "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island",
    "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State Of", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania",
    "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha",
    "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines",
    "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic",
    "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau",
    "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna",
    "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
  regionsFilteredOptions: Observable<string[]>;
  countriesFilteredOptions: Observable<string[]>;
  attributes: ModelAttribute[] = [];

  resultsFilteredOptions: Observable<ModelAttribute[]>;
  statusFilteredOptions: Observable<ModelAttribute[]>;

  results: ModelAttribute[]=[];
  status: ModelAttribute[]=[];
  codeClicked: boolean = false;

  searchCase: RequestSearchCase;
  caseSearchResult: ModelCase[]=[]; /*store search results from for search by criteria*/
  caseToFollow: ModelCase; /*follow up request from case list*/
  requestSaveFollowUp: RequestSaveFollowUp;
  /*Alert options*/
  alertOptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(public fb: FormBuilder, private alertService: AlertService,
              private communityInspectionService: CommunityInspectionService,
              private attributesService: AttributesService, private casesService: CasesService,
              private route: ActivatedRoute, private router: Router) {
    this.followupForm = this.fb.group({
      caseCode: '',
      criteria: '',
      testResultId: '', statusId: '', region: '', recentTravelTo: '',
      updatedByCodeConfirmedResult:'',
      updatedByCriteriaConfirmedResult:''
    });
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.caseToFollow = this.router.getCurrentNavigation().extras.state.caseToFollow;
      }
    });
  }


  /*****************************************************************************************************/
  /*****************************************************************************************************/
  ngOnInit() {

    this.attributesService.getAllAttributes().subscribe(result=>{
      this.attributes = result.returnValue.attributes;
      this.status = this.attributes.filter(r=>{
        return (parseInt(r.attCode)>=1060 && parseInt(r.attCode)<=1064);
      });
      this.results = this.attributes.filter(r=>{
        return (parseInt(r.attCode)>=1001 && parseInt(r.attCode)<=1003)
      })
    });
    /*****************************************************************************************************/
    /*****************************************************************************************************/
    this.regionsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRegions(value)),
    );
    this.countriesFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value))
    );

    this.resultsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterResults(value))
    );
    this.statusFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );
  }

  private _filterResults(value: string): ModelAttribute[] {
    const filterValue = value.toLowerCase();
    return this.results;
  }

  private _filterStatus(value: string): ModelAttribute[] {
    const filterValue = value.toLowerCase();
    return this.status;
  }

  private _filterRegions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.region.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.country.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  _searchRegion(value: string) {
    this.regionsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(value),
      map(value => this._filterRegions(value))
    );
  }
  _searchCountry(value: string) {
    this.countriesFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(value),
      map(value => this._filterCountries(value))
    );
  }

  searchPUIByCaseCode() {
    alert("Searching PUI by case code");
    this.communityInspectionService.getPUIByCaseCode(this.followupForm.get('caseCode').value).subscribe(result=>{
        this.caseInfo = result.returnValue;

      }
    );
    this.alertService.success("Found Case", this.alertOptions);
    this.loading = false;
    this.showByCodeSearchResult = true;

  }

  searchPUIByCriteria() {
    // alert("Searching PUI by Criteria: "+ this.followupForm.get('region').value);
    if(this.followupForm.get('region').value==='' && this.followupForm.get('recentTravelTo').value==='' &&
      this.followupForm.get('testResultId').value==='' && this.followupForm.get('statusId').value==='') {
      this.alertService.warn("Specify at least one search filter", this.alertOptions);
      return;
    }
    this.searchCase = {
      testResultId: this.followupForm.get('testResultId').value,
      statusId: this.followupForm.get('statusId').value,
      region: this.followupForm.get('region').value,
      recentTravelTo: this.followupForm.get('recentTravelTo').value
    }
    this.communityInspectionService.searchCaseByCriteria(this.searchCase).subscribe(result=>{
      this.caseSearchResult = result.returnValue.cases;

    }, error => this.alertService.warn("Error searching case, Couldn't connect to server. Check your internet connection"));

    // if(this.caseSearchResult.length>0){
    //   this.alertService.success("Results found", this.alertOptions);
    // }
    this.loading = false;
    this.showByOtherSearchResult = true;
  }

  onSubmit() {
    if(!this.codeClicked) {
      this.loading = true;
      this.searchPUIByCaseCode();
    }else {
      this.loading = true;
      this.searchPUIByCriteria();
    }
  }

  onByCodeClick() {
    this.codeClicked = true;
  }

  onByOtherClick() {
    this.codeClicked = false;
  }

  /*addQuestionToFollowUp(puiCaseCode: string, qId: number, selectedOption: string) {
    let modelPuiFollowUp: ModelPuiFollowUp= new class implements ModelPuiFollowUp {
      description: string;
      insertDate: Date;
      modifiedBy: number;
      puiCaseCode: string;
      qId: number;
      question: string;
      selectedOption: string;
    };
    modelPuiFollowUp.puiCaseCode = puiCaseCode;
    modelPuiFollowUp.qId = qId;
    modelPuiFollowUp.selectedOption = selectedOption;

    this.requestSaveFollowUp.list.push(modelPuiFollowUp);
  }*/

  registerFollowUp() {
    if(this.selectedValuesMap === null || this.selectedValuesMap.size < 1) {
      this.alertService.warn("Please check if all required fields are filled.", this.alertOptions);
      return;
    }
    alert("Updating to result: "+this.followupForm.get('updatedByCriteriaConfirmedResult').value);
    if(this.followupForm.get('updatedByCodeConfirmedResult').value !== ''){

      this.casesService.updateTestResult(this.caseToFollow.caseCode, parseInt(this.followupForm.get('updatedByCodeConfirmedResult').value) ).subscribe(
        result=>{
          this.requestSaveFollowUp = {list: Array.from(this.selectedValuesMap.values())};
          // console.log(this.requestSaveFollowUp);
          this.communityInspectionService.registerNewFollow(this.caseToFollow.caseCode, this.requestSaveFollowUp).subscribe(r=>{
            this.alertService.success("PUI Follow up updated!", this.alertOptions)
          }, error => this.alertService.warn("Error Updating PUI Follow up!", this.alertOptions));

        })
    }
    if( this.followupForm.get('updatedByCriteriaConfirmedResult').value !== ''){
      this.casesService.updateTestResult(this.caseToFollow.caseCode, this.followupForm.get('updatedByCriteriaConfirmedResult').value).subscribe(
        result=>{
          this.requestSaveFollowUp = {list: Array.from(this.selectedValuesMap.values())};
          // console.log(this.requestSaveFollowUp);
          this.communityInspectionService.registerNewFollow(this.caseToFollow.caseCode, this.requestSaveFollowUp).subscribe(r=>{
            this.alertService.success("PUI Follow up updated!", this.alertOptions)
          }, error => this.alertService.warn("Error Updating PUI Follow up!", this.alertOptions));
        })
    }
  }

  showFollowUp(followUpCase: ModelCase) {
    this.caseSearchResult = [];
    this.caseToFollow = followUpCase;
  }

  /* questionnaire map and Emitter */
  selectedValuesMap = new Map();
  // modelpuiFollowupList: ModelPuiFollowUp[];
  getSelectedQuestionOption(message: {id, question, option}) {
    let modelPui: ModelPuiFollowUp = {
      puiCaseCode: this.followupForm.get('caseCode').value,
      qId: message.id,
      question: message.question,
      selectedOption: message.option
    };

    this.selectedValuesMap.set(message.id, modelPui);
    // console.log(this.selectedValuesMap);
  }

}
