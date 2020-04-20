import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CasesService} from "../../../services/cases.service";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AlertService} from "../../../services/alert.service";
import {RequestSaveCase} from "../../../models/requestSaveCase";


@Component({
  selector: 'app-add-cases',
  templateUrl: './add-cases.component.html',
  styleUrls: ['./add-cases.component.scss']
})
export class AddCasesComponent implements OnInit {
  caseForm: FormGroup;
  cityName: string;
  country: string;
  dateOfBirth: NgbDateStruct;
  reportDate: NgbDateStruct;
  modifiedDate: NgbDateStruct;
  /*Alert options*/
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  /*ENUMS*/
  identifiedBy: string[] = ['CLINICAL_EVALUATION', 'CONTACT_TRACING', 'COMMUNITY_SURVEILLANCE'];
  status: string[] = ['STABLE', 'CRITICAL', 'DECEASED', 'RECOVERED', 'NA']
  result: string[] = ['TEST_PENDING', 'TEST_NEGATIVE', 'TEST_POSITIVE'];


  genders: string[] = ['M', 'F'];

  myControl = new FormControl();
  regions: string[] =
    ['Addis Ababa', 'Afar Region', 'Amhara Region',
      'Benishangul-Gumuz Region', 'Dire Dawa', 'Gambela Region',
      'Harari Region', 'Oromia Region', 'Somali Region',
      'Southern Nations, Nationalities, and Peoples\' Region', 'Tigray Region'
    ];
  occupations: string[] =
    ['Academics', 'Activist', 'Artist',
      'Business', 'Banker', 'Chef', 'Diplomat', 'Engineer', 'Entertainer', 'Fashion designer',
      'Judge', 'Media person', 'Military', 'Model', 'Nurse', 'Philanthropist', 'Philosopher',
      'Physician', 'Politics', 'Producer', 'Religious leader', 'Religious worker', 'Scholar',
      'Scientist', 'Sports', 'Theater', 'Writer'
    ];
  countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
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

  nationality: string[] =
    [ 'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguans', 'Argentinean',
      'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi',
      'Barbadian', 'Barbudans', 'Batswana', 'Belarusian', 'Belgian', 'Belizean', 'Beninese',
      'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian', 'Bulgarian',
      'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African',
      'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech',
      'Danish', 'Djibouti', 'Dominican', 'Dutch',
      'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian',
      'Fijian', 'Filipino', 'Finnish', 'French',
      'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan', 'Guinean', 'Guyanese',
      'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian',
      'I-Kiribati', 'Icelander', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian',
      'Jamaican', 'Japanese', 'Jordanian',
      'Kazakhstani', 'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz',
      'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian', 'Luxembourger',
      'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan', 'Malian', 'Maltese', 'Marshallese', 'Mauritanian',
      'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican',
      'Namibian', 'Nauruan', 'Nepalese', 'New Zealander', 'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Northern Irish', 'Norwegian',
      'Omani',
      'Pakistani', 'Palauan', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese',
      'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran',
      'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Seychellois',
      'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African',
      'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian',
      'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian/Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan',
      'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani',
      'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'
    ];

  regionsFilteredOptions: Observable<string[]>;
  occupationsFilteredOptions: Observable<string[]>;
  nationalityFilteredOptions: Observable<string[]>;
  countriesFilteredOptions: Observable<string[]>;
  genderOptions: Observable<string[]>;
  /*ENUMS*/
  resultOptions: Observable<string[]>;
  statusOptions: Observable<string[]>;
  identifiedByOptions: Observable<string[]>;
  date = new FormControl(new Date());

  requestSave: RequestSaveCase;

  constructor(public fb: FormBuilder, private casesService: CasesService, private calendar: NgbCalendar,
              private alertService: AlertService) {
    this.caseForm = this.fb.group({
      firstName: '', lastName: '',
      gender: '', dob: '',
      phoneNo: '', passportNumber: '',
      nationality: '', occupation: '',
      incidentPhone1: '', incidentPhone2: '',
      countryOfResidence: '', countryOfOrigin: '',
      region: '', subcityOrZone: '',
      woreda: '', kebele: '',
      streetName: '', houseNo: '',
      latitude: '', longitude: '',
      recentTravelTo: '',
      presumptiveResult: '', confirmedResult: '',
      identifiedBy: '', modifiedBy: '',
      reportDate: '', modifiedDate: '',
      parentCaseCode: '',
      admittedToFacility: '',
      status: ''

    })
  }

  ngOnInit() {

    this.resultOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterResult(value))
    );
    this.statusOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );
    this.identifiedByOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterIdentifiedBy(value))
    );

    this.genderOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGender(value))
    );
    this.regionsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRegions(value)),
    );

    this.occupationsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOccupations(value))
    );

    this.nationalityFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNationalities(value))
    );
    this.countriesFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value))
    );
  }

  private _filterGender(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.genders.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterRegions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.regions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterOccupations(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.occupations.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterNationalities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nationality.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  _searchRegion(value: string) {
    this.regionsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(value),
      map(value => this._filterRegions(value))
    );
  }
  _searchOccupation(value: string) {
    this.occupationsFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(value),
      map(value => this._filterOccupations(value))
    );
  }
  _searchNationality(value: string) {
    this.nationalityFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(value),
      map(value => this._filterNationalities(value))
    );
  }
  _searchCountry(value: string) {
    this.countriesFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(value),
      map(value => this._filterCountries(value))
    );
  }

  addCase() {
  //  console.log("Adding a new Case "+ this.caseForm.get('caseCode').value);
  //   let formData: any = new FormData();
    // formData.append("firstName", this.caseForm.get('firstName').value);
    // formData.append("lastName", this.caseForm.get('lastName').value);
    // formData.append("dob", this.caseForm.get('dob').value);
    // formData.append("gender", this.caseForm.get('gender').value);
    // formData.append("phoneNo", this.caseForm.get('phoneNo').value);
    // formData.append("passportNumber", this.caseForm.get('passportNumber').value);
    // formData.append("nationality", this.caseForm.get('nationality').value);
    // formData.append("occupation", this.caseForm.get('occupation').value);

    // formData.append("region", this.caseForm.get('region').value);
    // formData.append("subcityOrZone", this.caseForm.get('subcityOrZone').value);
    // formData.append("woreda", this.caseForm.get('woreda').value);
    // formData.append("kebele", this.caseForm.get('kebele').value);
    // //formData.append("streetName", this.caseForm.get('streetName').value);
    // formData.append("houseNo", this.caseForm.get('houseNo').value);
    // formData.append("latitude", this.caseForm.get('latitude').value);
    // formData.append("longitude", this.caseForm.get('longitude').value);
    //
    // formData.append("recentTravelTo", this.caseForm.get('recentTravelTo').value);
    // formData.append("admittedToFacility", this.caseForm.get('admittedToFacility').value);
    //
    // formData.append("identifiedBy", this.caseForm.get('identifiedBy').value);
    // formData.append("modifiedBy", this.caseForm.get('modifiedBy').value);
    // formData.append("reportDate", this.caseForm.get('reportDate').value);
    // formData.append("modifiedDate", this.caseForm.get('modifiedDate').value);
    //
    // formData.append("status", this.caseForm.get('status').value);
    // formData.append("parentCaseCode", this.caseForm.get('parentCaseCode').value);

    this.requestSave = {
      firstName :  this.caseForm.get('firstName').value,
      lastName : this.caseForm.get('lastName').value,
      passportNumber : this.caseForm.get('passportNumber').value,
      incidentContactPhone1 : this.caseForm.get('incidentPhone1').value,
      countryOfResidence : this.caseForm.get('countryOfResidence').value,
      identifiedBy : {id: 1020, value: this.caseForm.get('identifiedBy').value},
      modifiedBy : this.caseForm.get('modifiedBy').value
    }

    this.casesService.createNewCase(this.requestSave).subscribe(result=>{
      alert(result.message);
      this.alertService.success("Case Registered!", this.options)
     // alert("Case Registered with code: " + result.toString());

    })

  }

  private _filterResult(value: string) : string[] {
    const filterValue = value.toLowerCase();
    return this.result.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterStatus(value: string) : string[] {
    const filterValue = value.toLowerCase();
    return this.status.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterIdentifiedBy(value: string) : string[] {
    const filterValue = value.toLowerCase();
    return this.identifiedBy.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
