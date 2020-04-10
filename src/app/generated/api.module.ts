import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AttributesService } from './api/attributes.service';
import { AuthenticateService } from './api/authenticate.service';
import { CaseService } from './api/case.service';
import { CaseFollowUpService } from './api/caseFollowUp.service';
import { DailyStatusService } from './api/dailyStatus.service';
import { HealthFacilityService } from './api/healthFacility.service';
import { QuestionnierService } from './api/questionnier.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AttributesService,
    AuthenticateService,
    CaseService,
    CaseFollowUpService,
    DailyStatusService,
    HealthFacilityService,
    QuestionnierService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
