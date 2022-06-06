/* tslint:disable */
/* eslint-disable */
/**
 * Disheap Service
 * Disheap API connection to Disbands and Disbeacs information
 *
 * The version of the OpenAPI document: v0.0.1
 * Contact: ire.cunba@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Homework object
 * @export
 * @interface HomeworkDTO
 */
export interface HomeworkDTO {
    /**
     * 
     * @type {string}
     * @memberof HomeworkDTO
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof HomeworkDTO
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof HomeworkDTO
     */
    deadline?: number;
    /**
     * 
     * @type {string}
     * @memberof HomeworkDTO
     */
    subjectId?: string;
    /**
     * 
     * @type {string}
     * @memberof HomeworkDTO
     */
    userId?: string;
}

export function HomeworkDTOFromJSON(json: any): HomeworkDTO {
    return HomeworkDTOFromJSONTyped(json, false);
}

export function HomeworkDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): HomeworkDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'deadline': !exists(json, 'deadline') ? undefined : json['deadline'],
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function HomeworkDTOToJSON(value?: HomeworkDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'deadline': value.deadline,
        'subjectId': value.subjectId,
        'userId': value.userId,
    };
}
