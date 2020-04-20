/**
 * Covid19-case-follow-up
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ModelEnumIdValue } from './modelEnumIdValue';


export interface ModelRumor { 
    id?: number;
    suspectName: string;
    gender?: string;
    address: string;
    reportDate?: Date;
    fever: string;
    cough: string;
    headache: string;
    symptomsDuration?: number;
    reportingPersonName: string;
    relationWithSuspect?: string;
    phoneNumber1: string;
    phoneNumber2?: string;
    modifiedBy?: string;
    status?: ModelEnumIdValue;
}
