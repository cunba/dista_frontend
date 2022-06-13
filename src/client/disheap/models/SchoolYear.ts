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
 * 
 * @export
 * @interface SchoolYear
 */
export interface SchoolYear {
    /**
     * 
     * @type {string}
     * @memberof SchoolYear
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof SchoolYear
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof SchoolYear
     */
    study?: string;
}

export function SchoolYearFromJSON(json: any): SchoolYear {
    return SchoolYearFromJSONTyped(json, false);
}

export function SchoolYearFromJSONTyped(json: any, ignoreDiscriminator: boolean): SchoolYear {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'study': !exists(json, 'study') ? undefined : json['study'],
    };
}

export function SchoolYearToJSON(value?: SchoolYear | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'study': value.study,
    };
}

