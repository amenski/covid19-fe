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
    autoClose: true,
    keepAfterRouteChange: false
  };
  followUpLoading: boolean = false;
  /* questionnaire map and Emitter */
  selectedValuesMap = new Map();

  constructor(public fb: FormBuilder, private alertService: AlertService,
              private communityInspectionService: CommunityInspectionService,
              private attributesService: AttributesService, private casesService: CasesService,
              private route: ActivatedRoute, private router: Router) {
    this.followupForm = this.fb.group({
      caseCode: '',
      criteria: '',
      testResultId: '', statusId: '', region: '', recentTravelTo: '',
      updatedByCodeConfirmedResult:'',
      updatedByCriteriaConfirmedResult:'',
      updatedByCriteriaStatus: '', updatedByCodeStatus:''
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
        return (parseInt(r.attCode)>=1060 && parseInt(r.attCode)<=1065);
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

  searchPUIByCaseCode(caseCode: string) {
    this.communityInspectionService.getPUIByCaseCode(caseCode).subscribe(result => {
      this.caseInfo = result.returnValue;
      this.showByCodeSearchResult = true;
    }, err => {
      this.alertService.error('Error: ' + err.error.message, this.alertOptions);
      this.showByCodeSearchResult = false;
    });
    this.loading = false;
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

    this.showByOtherSearchResult = true;
    this.loading = false;
  }

  onSubmit() {
    const code = this.followupForm.get('caseCode').value || '';
    if(!this.codeClicked) {
      this.loading = true;
      this.searchPUIByCaseCode(code);
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


  registerFollowUp() {
    this.followUpLoading = true;
    /*Questions Validations - To be updated*/
    if(this.selectedValuesMap === null || this.selectedValuesMap.size < 1) {
      this.alertService.warn('Please fill one or more questionnaiers that apply.', this.alertOptions);
      return;
    }
    /*Update result and status if modified*/
    this.updatePuiStatus();
    this.updateConfirmedTestResult();
    /*Update the PUI Follow up*/
    this.updatePUIFollowUp();
    this.followUpLoading = false;
  }

  updateConfirmedTestResult() {
    const confirmedValue = this.followupForm.get('updatedByCodeConfirmedResult').value;
    /*Update Test Result*/
    if(confirmedValue !== null  && confirmedValue.trim() !== ''){
      this.casesService.updateTestResult(this.caseInfo.caseCode, confirmedValue).subscribe(
        result=> {
          if(result.success) {
            this.alertService.success('Result Updated successfuly');
            this.searchPUIByCaseCode(this.caseInfo.caseCode);
          }
        },
        error => this.alertService.error('Error: ' + error.error.message));
    }
  }

  updatePuiStatus() {
    /*Update Status*/
    if(this.followupForm.get('updatedByCodeStatus').value !== ''){
      this.casesService.updateStatus(this.caseInfo.caseCode, this.followupForm.get('updatedByCodeStatus').value).subscribe(
        result => {
          if(result.success) {
            this.alertService.success('Status Updated successfuly');
            this.searchPUIByCaseCode(this.caseInfo.caseCode);
          }
        },
        error => this.alertService.error('Error: ' + error.error.message));
    }
  }

  updatePUIFollowUp() {
    this.requestSaveFollowUp = {list: Array.from(this.selectedValuesMap.values())};
    this.communityInspectionService.registerNewFollow(this.caseToFollow.caseCode, this.requestSaveFollowUp)
    .subscribe(r=>{
      this.alertService.success("PUI Follow up updated!", this.alertOptions)
    }, error => this.alertService.warn("Error Updating PUI Follow up!", this.alertOptions));
  }

  showFollowUp(followUpCase: ModelCase) {
    this.caseSearchResult = [];
    this.caseToFollow = followUpCase;
  }

  getSelectedQuestionOption(message: {id, question, option}) {
    const modelPui: ModelPuiFollowUp = {
      puiCaseCode: this.followupForm.get('caseCode').value,
      qId: message.id,
      question: message.question,
      selectedOption: message.option
    };
    this.selectedValuesMap.set(message.id, modelPui);
  }

}
