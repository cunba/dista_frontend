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


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    HeartRate,
    HeartRateFromJSON,
    HeartRateToJSON,
    MeasureDTO,
    MeasureDTOFromJSON,
    MeasureDTOToJSON,
    MeasureResponseHeartRate,
    MeasureResponseHeartRateFromJSON,
    MeasureResponseHeartRateToJSON,
} from '../models';

export interface DeleteHeartRatesByDisbandIdRequest {
    disbandId: string;
}

export interface GetHeartRateByIdRequest {
    id: string;
}

export interface GetHeartRatesByDateBetweenRequest {
    minDate: number;
    maxDate: number;
}

export interface GetHeartRatesByDateBetweenAndDisbandIdRequest {
    minDate: number;
    maxDate: number;
    disbandId: string;
}

export interface GetHeartRatesByDisbandIdRequest {
    disbandId: string;
}

export interface GetLast1HeartRateByDateBetweenAndDisbandIdRequest {
    minDate: number;
    maxDate: number;
    disbandId: string;
}

export interface SaveHeartRateRequest {
    measureDTO: MeasureDTO;
}

/**
 * HeartRateApi - interface
 * 
 * @export
 * @interface HeartRateApiInterface
 */
export interface HeartRateApiInterface {
    /**
     * 
     * @summary Delete heart rates by disband ID
     * @param {string} disbandId Disband id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    deleteHeartRatesByDisbandIdRaw(requestParameters: DeleteHeartRatesByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>>;

    /**
     * Delete heart rates by disband ID
     */
    deleteHeartRatesByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>>;

    /**
     * 
     * @summary Get all heart rates
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    getAllHeartRatesRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>>;

    /**
     * Get all heart rates
     */
    getAllHeartRates(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>>;

    /**
     * 
     * @summary Get heart rate by ID
     * @param {string} id Heart rate ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    getHeartRateByIdRaw(requestParameters: GetHeartRateByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HeartRate>>;

    /**
     * Get heart rate by ID
     */
    getHeartRateById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HeartRate>;

    /**
     * 
     * @summary Get heart rates by date between
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    getHeartRatesByDateBetweenRaw(requestParameters: GetHeartRatesByDateBetweenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>>;

    /**
     * Get heart rates by date between
     */
    getHeartRatesByDateBetween(minDate: number, maxDate: number, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>>;

    /**
     * 
     * @summary Get heart rates by date between and disband ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    getHeartRatesByDateBetweenAndDisbandIdRaw(requestParameters: GetHeartRatesByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<MeasureResponseHeartRate>>;

    /**
     * Get heart rates by date between and disband ID
     */
    getHeartRatesByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<MeasureResponseHeartRate>;

    /**
     * 
     * @summary Get heart rates by disband ID
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    getHeartRatesByDisbandIdRaw(requestParameters: GetHeartRatesByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>>;

    /**
     * Get heart rates by disband ID
     */
    getHeartRatesByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>>;

    /**
     * 
     * @summary Get last heart rate by disband ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    getLast1HeartRateByDateBetweenAndDisbandIdRaw(requestParameters: GetLast1HeartRateByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HeartRate>>;

    /**
     * Get last heart rate by disband ID
     */
    getLast1HeartRateByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HeartRate>;

    /**
     * 
     * @summary Save heart rate
     * @param {MeasureDTO} measureDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HeartRateApiInterface
     */
    saveHeartRateRaw(requestParameters: SaveHeartRateRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HeartRate>>;

    /**
     * Save heart rate
     */
    saveHeartRate(measureDTO: MeasureDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HeartRate>;

}

/**
 * 
 */
export class HeartRateApi extends runtime.BaseAPI implements HeartRateApiInterface {

    /**
     * Delete heart rates by disband ID
     */
    async deleteHeartRatesByDisbandIdRaw(requestParameters: DeleteHeartRatesByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>> {
        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling deleteHeartRatesByDisbandId.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates/disbands/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HeartRateFromJSON));
    }

    /**
     * Delete heart rates by disband ID
     */
    async deleteHeartRatesByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>> {
        const response = await this.deleteHeartRatesByDisbandIdRaw({ disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get all heart rates
     */
    async getAllHeartRatesRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HeartRateFromJSON));
    }

    /**
     * Get all heart rates
     */
    async getAllHeartRates(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>> {
        const response = await this.getAllHeartRatesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get heart rate by ID
     */
    async getHeartRateByIdRaw(requestParameters: GetHeartRateByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HeartRate>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getHeartRateById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HeartRateFromJSON(jsonValue));
    }

    /**
     * Get heart rate by ID
     */
    async getHeartRateById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HeartRate> {
        const response = await this.getHeartRateByIdRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Get heart rates by date between
     */
    async getHeartRatesByDateBetweenRaw(requestParameters: GetHeartRatesByDateBetweenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getHeartRatesByDateBetween.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getHeartRatesByDateBetween.');
        }

        const queryParameters: any = {};

        if (requestParameters.minDate !== undefined) {
            queryParameters['min date'] = requestParameters.minDate;
        }

        if (requestParameters.maxDate !== undefined) {
            queryParameters['max date'] = requestParameters.maxDate;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates/date/between`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HeartRateFromJSON));
    }

    /**
     * Get heart rates by date between
     */
    async getHeartRatesByDateBetween(minDate: number, maxDate: number, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>> {
        const response = await this.getHeartRatesByDateBetweenRaw({ minDate: minDate, maxDate: maxDate }, initOverrides);
        return await response.value();
    }

    /**
     * Get heart rates by date between and disband ID
     */
    async getHeartRatesByDateBetweenAndDisbandIdRaw(requestParameters: GetHeartRatesByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<MeasureResponseHeartRate>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getHeartRatesByDateBetweenAndDisbandId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getHeartRatesByDateBetweenAndDisbandId.');
        }

        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getHeartRatesByDateBetweenAndDisbandId.');
        }

        const queryParameters: any = {};

        if (requestParameters.minDate !== undefined) {
            queryParameters['min date'] = requestParameters.minDate;
        }

        if (requestParameters.maxDate !== undefined) {
            queryParameters['max date'] = requestParameters.maxDate;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates/date/between/disband/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MeasureResponseHeartRateFromJSON(jsonValue));
    }

    /**
     * Get heart rates by date between and disband ID
     */
    async getHeartRatesByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<MeasureResponseHeartRate> {
        const response = await this.getHeartRatesByDateBetweenAndDisbandIdRaw({ minDate: minDate, maxDate: maxDate, disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get heart rates by disband ID
     */
    async getHeartRatesByDisbandIdRaw(requestParameters: GetHeartRatesByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HeartRate>>> {
        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getHeartRatesByDisbandId.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates/disbands/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HeartRateFromJSON));
    }

    /**
     * Get heart rates by disband ID
     */
    async getHeartRatesByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HeartRate>> {
        const response = await this.getHeartRatesByDisbandIdRaw({ disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get last heart rate by disband ID
     */
    async getLast1HeartRateByDateBetweenAndDisbandIdRaw(requestParameters: GetLast1HeartRateByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HeartRate>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getLast1HeartRateByDateBetweenAndDisbandId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getLast1HeartRateByDateBetweenAndDisbandId.');
        }

        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getLast1HeartRateByDateBetweenAndDisbandId.');
        }

        const queryParameters: any = {};

        if (requestParameters.minDate !== undefined) {
            queryParameters['min date'] = requestParameters.minDate;
        }

        if (requestParameters.maxDate !== undefined) {
            queryParameters['max date'] = requestParameters.maxDate;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates/last/disbandId/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HeartRateFromJSON(jsonValue));
    }

    /**
     * Get last heart rate by disband ID
     */
    async getLast1HeartRateByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HeartRate> {
        const response = await this.getLast1HeartRateByDateBetweenAndDisbandIdRaw({ minDate: minDate, maxDate: maxDate, disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Save heart rate
     */
    async saveHeartRateRaw(requestParameters: SaveHeartRateRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HeartRate>> {
        if (requestParameters.measureDTO === null || requestParameters.measureDTO === undefined) {
            throw new runtime.RequiredError('measureDTO','Required parameter requestParameters.measureDTO was null or undefined when calling saveHeartRate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/heart-rates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MeasureDTOToJSON(requestParameters.measureDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HeartRateFromJSON(jsonValue));
    }

    /**
     * Save heart rate
     */
    async saveHeartRate(measureDTO: MeasureDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HeartRate> {
        const response = await this.saveHeartRateRaw({ measureDTO: measureDTO }, initOverrides);
        return await response.value();
    }

}
