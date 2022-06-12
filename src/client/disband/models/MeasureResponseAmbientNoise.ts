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
    AmbientNoise,
    AmbientNoiseFromJSON,
    AmbientNoiseFromJSONTyped,
    AmbientNoiseToJSON,
} from './AmbientNoise';

/**
 * 
 * @export
 * @interface MeasureResponseAmbientNoise
 */
export interface MeasureResponseAmbientNoise {
    /**
     * 
     * @type {Array<AmbientNoise>}
     * @memberof MeasureResponseAmbientNoise
     */
    measures?: Array<AmbientNoise>;
    /**
     * 
     * @type {number}
     * @memberof MeasureResponseAmbientNoise
     */
    minMeasure?: number;
    /**
     * 
     * @type {number}
     * @memberof MeasureResponseAmbientNoise
     */
    maxMeasure?: number;
}

export function MeasureResponseAmbientNoiseFromJSON(json: any): MeasureResponseAmbientNoise {
    return MeasureResponseAmbientNoiseFromJSONTyped(json, false);
}

export function MeasureResponseAmbientNoiseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MeasureResponseAmbientNoise {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'measures': !exists(json, 'measures') ? undefined : ((json['measures'] as Array<any>).map(AmbientNoiseFromJSON)),
        'minMeasure': !exists(json, 'minMeasure') ? undefined : json['minMeasure'],
        'maxMeasure': !exists(json, 'maxMeasure') ? undefined : json['maxMeasure'],
    };
}

export function MeasureResponseAmbientNoiseToJSON(value?: MeasureResponseAmbientNoise | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'measures': value.measures === undefined ? undefined : ((value.measures as Array<any>).map(AmbientNoiseToJSON)),
        'minMeasure': value.minMeasure,
        'maxMeasure': value.maxMeasure,
    };
}
