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


export interface ModelQuestionnaire { 
    id?: number;
    question: string;
    /**
     * Should be a valid json data
     */
    options: string;
    category: ModelEnumIdValue;
    parentId?: number;
    description?: string;
    modifiedBy?: string;
    insertDate?: Date;
    modifiedDate?: Date;
}
