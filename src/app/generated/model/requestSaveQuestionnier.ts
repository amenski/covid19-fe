/**
 * Covid19-case-follow-up
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ModelEnumIdValue } from './modelEnumIdValue';
import { ModelQuestionnier } from './modelQuestionnier';


export interface RequestSaveQuestionnier { 
    id?: number;
    question: string;
    /**
     * Should be a valid json data
     */
    options: string;
    category: ModelEnumIdValue;
    parentId?: number;
    description?: string;
    modifiedBy?: number;
    insertDate?: Date;
    modifiedDate?: Date;
}
