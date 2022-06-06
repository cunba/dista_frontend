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
    MeasureDTO,
    MeasureDTOFromJSON,
    MeasureDTOToJSON,
    Oxygen,
    OxygenFromJSON,
    OxygenToJSON,
} from '../models';

export interface DeleteOxygensByDisbandIdRequest {
    disbandId: string;
}

export interface GetById2Request {
    id: string;
}

export interface GetLast1ByDisbandId2Request {
    minDate: number;
    maxDate: number;
    disbandId: string;
}

export interface GetOxygensByDateBetweenRequest {
    minDate: number;
    maxDate: number;
}

export interface GetOxygensByDateBetweenAndDisbandIdRequest {
    minDate: number;
    maxDate: number;
    disbandId: string;
}

export interface GetOxygensByDisbandIdRequest {
    disbandId: string;
}

export interface SaveOxygenRequest {
    measureDTO: MeasureDTO;
}

/**
 * OxygenApi - interface
 * 
 * @export
 * @interface OxygenApiInterface
 */
export interface OxygenApiInterface {
    /**
     * 
     * @summary Delete oxygens by disband ID
     * @param {string} disbandId Disband id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    deleteOxygensByDisbandIdRaw(requestParameters: DeleteOxygensByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>>;

    /**
     * Delete oxygens by disband ID
     */
    deleteOxygensByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>>;

    /**
     * 
     * @summary Get all oxygens
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    getAllOxygenRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>>;

    /**
     * Get all oxygens
     */
    getAllOxygen(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>>;

    /**
     * 
     * @summary Get oxygen by ID
     * @param {string} id Oxygen ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    getById2Raw(requestParameters: GetById2Request, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Oxygen>>;

    /**
     * Get oxygen by ID
     */
    getById2(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Oxygen>;

    /**
     * 
     * @summary Get last oxygen by disband ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    getLast1ByDisbandId2Raw(requestParameters: GetLast1ByDisbandId2Request, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Oxygen>>;

    /**
     * Get last oxygen by disband ID
     */
    getLast1ByDisbandId2(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Oxygen>;

    /**
     * 
     * @summary Get oxygens by date between
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    getOxygensByDateBetweenRaw(requestParameters: GetOxygensByDateBetweenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>>;

    /**
     * Get oxygens by date between
     */
    getOxygensByDateBetween(minDate: number, maxDate: number, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>>;

    /**
     * 
     * @summary Get oxygens by date between and disband ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    getOxygensByDateBetweenAndDisbandIdRaw(requestParameters: GetOxygensByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>>;

    /**
     * Get oxygens by date between and disband ID
     */
    getOxygensByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>>;

    /**
     * 
     * @summary Get oxygens by disband ID
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    getOxygensByDisbandIdRaw(requestParameters: GetOxygensByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>>;

    /**
     * Get oxygens by disband ID
     */
    getOxygensByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>>;

    /**
     * 
     * @summary Save oxygen
     * @param {MeasureDTO} measureDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OxygenApiInterface
     */
    saveOxygenRaw(requestParameters: SaveOxygenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Oxygen>>;

    /**
     * Save oxygen
     */
    saveOxygen(measureDTO: MeasureDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Oxygen>;

}

/**
 * 
 */
export class OxygenApi extends runtime.BaseAPI implements OxygenApiInterface {

    /**
     * Delete oxygens by disband ID
     */
    async deleteOxygensByDisbandIdRaw(requestParameters: DeleteOxygensByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>> {
        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling deleteOxygensByDisbandId.');
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
            path: `/oxygens/disbands/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OxygenFromJSON));
    }

    /**
     * Delete oxygens by disband ID
     */
    async deleteOxygensByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>> {
        const response = await this.deleteOxygensByDisbandIdRaw({ disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get all oxygens
     */
    async getAllOxygenRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>> {
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
            path: `/oxygens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OxygenFromJSON));
    }

    /**
     * Get all oxygens
     */
    async getAllOxygen(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>> {
        const response = await this.getAllOxygenRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get oxygen by ID
     */
    async getById2Raw(requestParameters: GetById2Request, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Oxygen>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getById2.');
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
            path: `/oxygens/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OxygenFromJSON(jsonValue));
    }

    /**
     * Get oxygen by ID
     */
    async getById2(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Oxygen> {
        const response = await this.getById2Raw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Get last oxygen by disband ID
     */
    async getLast1ByDisbandId2Raw(requestParameters: GetLast1ByDisbandId2Request, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Oxygen>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getLast1ByDisbandId2.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getLast1ByDisbandId2.');
        }

        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getLast1ByDisbandId2.');
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
            path: `/oxygens/last/disbandId/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OxygenFromJSON(jsonValue));
    }

    /**
     * Get last oxygen by disband ID
     */
    async getLast1ByDisbandId2(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Oxygen> {
        const response = await this.getLast1ByDisbandId2Raw({ minDate: minDate, maxDate: maxDate, disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get oxygens by date between
     */
    async getOxygensByDateBetweenRaw(requestParameters: GetOxygensByDateBetweenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getOxygensByDateBetween.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getOxygensByDateBetween.');
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
            path: `/oxygens/date/between`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OxygenFromJSON));
    }

    /**
     * Get oxygens by date between
     */
    async getOxygensByDateBetween(minDate: number, maxDate: number, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>> {
        const response = await this.getOxygensByDateBetweenRaw({ minDate: minDate, maxDate: maxDate }, initOverrides);
        return await response.value();
    }

    /**
     * Get oxygens by date between and disband ID
     */
    async getOxygensByDateBetweenAndDisbandIdRaw(requestParameters: GetOxygensByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getOxygensByDateBetweenAndDisbandId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getOxygensByDateBetweenAndDisbandId.');
        }

        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getOxygensByDateBetweenAndDisbandId.');
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
            path: `/oxygens/date/between/disband/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OxygenFromJSON));
    }

    /**
     * Get oxygens by date between and disband ID
     */
    async getOxygensByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>> {
        const response = await this.getOxygensByDateBetweenAndDisbandIdRaw({ minDate: minDate, maxDate: maxDate, disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get oxygens by disband ID
     */
    async getOxygensByDisbandIdRaw(requestParameters: GetOxygensByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Oxygen>>> {
        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getOxygensByDisbandId.');
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
            path: `/oxygens/disbands/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OxygenFromJSON));
    }

    /**
     * Get oxygens by disband ID
     */
    async getOxygensByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Oxygen>> {
        const response = await this.getOxygensByDisbandIdRaw({ disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Save oxygen
     */
    async saveOxygenRaw(requestParameters: SaveOxygenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Oxygen>> {
        if (requestParameters.measureDTO === null || requestParameters.measureDTO === undefined) {
            throw new runtime.RequiredError('measureDTO','Required parameter requestParameters.measureDTO was null or undefined when calling saveOxygen.');
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
            path: `/oxygens`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MeasureDTOToJSON(requestParameters.measureDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OxygenFromJSON(jsonValue));
    }

    /**
     * Save oxygen
     */
    async saveOxygen(measureDTO: MeasureDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Oxygen> {
        const response = await this.saveOxygenRaw({ measureDTO: measureDTO }, initOverrides);
        return await response.value();
    }

}