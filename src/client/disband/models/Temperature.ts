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
 * @interface Temperature
 */
export interface Temperature {
    /**
     * 
     * @type {string}
     * @memberof Temperature
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof Temperature
     */
    data?: number;
    /**
     * 
     * @type {number}
     * @memberof Temperature
     */
    date?: number;
    /**
     * 
     * @type {Disband}
     * @memberof Temperature
     */
    disband?: Disband;
}

export function TemperatureFromJSON(json: any): Temperature {
    return TemperatureFromJSONTyped(json, false);
}

export function TemperatureFromJSONTyped(json: any, ignoreDiscriminator: boolean): Temperature {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'data': !exists(json, 'data') ? undefined : json['data'],
        'date': !exists(json, 'date') ? undefined : json['date'],
        'disband': !exists(json, 'disband') ? undefined : DisbandFromJSON(json['disband']),
    };
}

export function TemperatureToJSON(value?: Temperature | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'data': value.data,
        'date': value.date,
        'disband': DisbandToJSON(value.disband),
    };
}
