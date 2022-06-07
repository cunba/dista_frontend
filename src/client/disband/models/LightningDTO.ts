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
 * Measure object
 * @export
 * @interface LightningDTO
 */
export interface LightningDTO {
    /**
     * 
     * @type {number}
     * @memberof LightningDTO
     */
    lightning?: number;
    /**
     * 
     * @type {number}
     * @memberof LightningDTO
     */
    redLightning?: number;
    /**
     * 
     * @type {number}
     * @memberof LightningDTO
     */
    greenLightning?: number;
    /**
     * 
     * @type {number}
     * @memberof LightningDTO
     */
    blueLightning?: number;
    /**
     * 
     * @type {number}
     * @memberof LightningDTO
     */
    date?: number;
    /**
     * 
     * @type {string}
     * @memberof LightningDTO
     */
    disbandMac?: string;
}

export function LightningDTOFromJSON(json: any): LightningDTO {
    return LightningDTOFromJSONTyped(json, false);
}

export function LightningDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): LightningDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lightning': !exists(json, 'lightning') ? undefined : json['lightning'],
        'redLightning': !exists(json, 'redLightning') ? undefined : json['redLightning'],
        'greenLightning': !exists(json, 'greenLightning') ? undefined : json['greenLightning'],
        'blueLightning': !exists(json, 'blueLightning') ? undefined : json['blueLightning'],
        'date': !exists(json, 'date') ? undefined : json['date'],
        'disbandMac': !exists(json, 'disbandMac') ? undefined : json['disbandMac'],
    };
}

export function LightningDTOToJSON(value?: LightningDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lightning': value.lightning,
        'redLightning': value.redLightning,
        'greenLightning': value.greenLightning,
        'blueLightning': value.blueLightning,
        'date': value.date,
        'disbandMac': value.disbandMac,
    };
}

