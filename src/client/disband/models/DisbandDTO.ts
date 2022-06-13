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
 * Disband object
 * @export
 * @interface DisbandDTO
 */
export interface DisbandDTO {
    /**
     * 
     * @type {string}
     * @memberof DisbandDTO
     */
    mac: string;
    /**
     * 
     * @type {string}
     * @memberof DisbandDTO
     */
    model: string;
    /**
     * 
     * @type {string}
     * @memberof DisbandDTO
     */
    version: string;
    /**
     * 
     * @type {number}
     * @memberof DisbandDTO
     */
    date?: number;
    /**
     * 
     * @type {string}
     * @memberof DisbandDTO
     */
    userId: string;
}

export function DisbandDTOFromJSON(json: any): DisbandDTO {
    return DisbandDTOFromJSONTyped(json, false);
}

export function DisbandDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DisbandDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mac': json['mac'],
        'model': json['model'],
        'version': json['version'],
        'date': !exists(json, 'date') ? undefined : json['date'],
        'userId': json['userId'],
    };
}

export function DisbandDTOToJSON(value?: DisbandDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mac': value.mac,
        'model': value.model,
        'version': value.version,
        'date': value.date,
        'userId': value.userId,
    };
}

