import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../helpers/constants';
import {CaseService, ModelCase} from '../generated';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient, private caseService: CaseService) { }

  getCase(code: string): Observable<ModelCase> {
    return this.caseService.getCase(code).pipe(map(response => response.returnValue));
  }

  createNewCase(formData: FormData): Observable<any> {
      const url = BASE_URL + '/v1/cases';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      const puiCase = {};
      formData.forEach((value, key) => {
        puiCase[key] = value;

        console.log(key + ' : ' + value);
      });
      const json = JSON.stringify(puiCase);

      // this.caseService.registerNewCase()
      return this.http.post(url, puiCase, httpOptions);
  }

}
