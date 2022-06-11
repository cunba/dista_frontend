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
import {
    Disband,
    DisbandFromJSON,
    DisbandFromJSONTyped,
    DisbandToJSON,
} from './Disband';

/**
 * 
 * @export
 * @interface Humidity
 */
export interface Humidity {
    /**
     * 
     * @type {string}
     * @memberof Humidity
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof Humidity
     */
    data?: number;
    /**
     * 
     * @type {number}
     * @memberof Humidity
     */
    date?: number;
}

export function HumidityFromJSON(json: any): Humidity {
    return HumidityFromJSONTyped(json, false);
}

export function HumidityFromJSONTyped(json: any, ignoreDiscriminator: boolean): Humidity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'data': !exists(json, 'data') ? undefined : json['data'],
        'date': !exists(json, 'date') ? undefined : json['date']
    };
}

export function HumidityToJSON(value?: Humidity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'data': value.data,
        'date': value.date
    };
}

