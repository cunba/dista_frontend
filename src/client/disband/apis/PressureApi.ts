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
    Pressure,
    PressureFromJSON,
    PressureToJSON,
} from '../models';

export interface DeletePressuresByDisbandIdRequest {
    disbandId: string;
}

export interface GetLast1PressureByDateBetweenAndDisbandIdRequest {
    minDate: number;
    maxDate: number;
    disbandId: string;
}

export interface GetPressureByIdRequest {
    id: string;
}

export interface GetPressuresByDateBetweenRequest {
    minDate: number;
    maxDate: number;
}

export interface GetPressuresByDateBetweenAndDisbandIdRequest {
    minDate: number;
    maxDate: number;
    disbandId: string;
}

export interface GetPressuresByDisbandIdRequest {
    disbandId: string;
}

export interface SavePressureRequest {
    measureDTO: MeasureDTO;
}

/**
 * PressureApi - interface
 * 
 * @export
 * @interface PressureApiInterface
 */
export interface PressureApiInterface {
    /**
     * 
     * @summary Delete pressures by disband ID
     * @param {string} disbandId Disband id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    deletePressuresByDisbandIdRaw(requestParameters: DeletePressuresByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>>;

    /**
     * Delete pressures by disband ID
     */
    deletePressuresByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>>;

    /**
     * 
     * @summary Get all pressures
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    getAllPressuresRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>>;

    /**
     * Get all pressures
     */
    getAllPressures(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>>;

    /**
     * 
     * @summary Get last pressure by disband ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    getLast1PressureByDateBetweenAndDisbandIdRaw(requestParameters: GetLast1PressureByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Pressure>>;

    /**
     * Get last pressure by disband ID
     */
    getLast1PressureByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Pressure>;

    /**
     * 
     * @summary Get pressure by ID
     * @param {string} id Pressure ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    getPressureByIdRaw(requestParameters: GetPressureByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Pressure>>;

    /**
     * Get pressure by ID
     */
    getPressureById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Pressure>;

    /**
     * 
     * @summary Get pressures by date between
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    getPressuresByDateBetweenRaw(requestParameters: GetPressuresByDateBetweenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>>;

    /**
     * Get pressures by date between
     */
    getPressuresByDateBetween(minDate: number, maxDate: number, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>>;

    /**
     * 
     * @summary Get pressures by date between and disband ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    getPressuresByDateBetweenAndDisbandIdRaw(requestParameters: GetPressuresByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>>;

    /**
     * Get pressures by date between and disband ID
     */
    getPressuresByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>>;

    /**
     * 
     * @summary Get pressures by disband ID
     * @param {string} disbandId Disband ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    getPressuresByDisbandIdRaw(requestParameters: GetPressuresByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>>;

    /**
     * Get pressures by disband ID
     */
    getPressuresByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>>;

    /**
     * 
     * @summary Save pressure
     * @param {MeasureDTO} measureDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PressureApiInterface
     */
    savePressureRaw(requestParameters: SavePressureRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Pressure>>;

    /**
     * Save pressure
     */
    savePressure(measureDTO: MeasureDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Pressure>;

}

/**
 * 
 */
export class PressureApi extends runtime.BaseAPI implements PressureApiInterface {

    /**
     * Delete pressures by disband ID
     */
    async deletePressuresByDisbandIdRaw(requestParameters: DeletePressuresByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>> {
        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling deletePressuresByDisbandId.');
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
            path: `/pressures/disbands/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PressureFromJSON));
    }

    /**
     * Delete pressures by disband ID
     */
    async deletePressuresByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>> {
        const response = await this.deletePressuresByDisbandIdRaw({ disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get all pressures
     */
    async getAllPressuresRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>> {
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
            path: `/pressures`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PressureFromJSON));
    }

    /**
     * Get all pressures
     */
    async getAllPressures(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>> {
        const response = await this.getAllPressuresRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get last pressure by disband ID
     */
    async getLast1PressureByDateBetweenAndDisbandIdRaw(requestParameters: GetLast1PressureByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Pressure>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getLast1PressureByDateBetweenAndDisbandId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getLast1PressureByDateBetweenAndDisbandId.');
        }

        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getLast1PressureByDateBetweenAndDisbandId.');
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
            path: `/pressures/last/disbandId/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PressureFromJSON(jsonValue));
    }

    /**
     * Get last pressure by disband ID
     */
    async getLast1PressureByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Pressure> {
        const response = await this.getLast1PressureByDateBetweenAndDisbandIdRaw({ minDate: minDate, maxDate: maxDate, disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get pressure by ID
     */
    async getPressureByIdRaw(requestParameters: GetPressureByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Pressure>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPressureById.');
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
            path: `/pressures/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PressureFromJSON(jsonValue));
    }

    /**
     * Get pressure by ID
     */
    async getPressureById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Pressure> {
        const response = await this.getPressureByIdRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Get pressures by date between
     */
    async getPressuresByDateBetweenRaw(requestParameters: GetPressuresByDateBetweenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getPressuresByDateBetween.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getPressuresByDateBetween.');
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
            path: `/pressures/date/between`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PressureFromJSON));
    }

    /**
     * Get pressures by date between
     */
    async getPressuresByDateBetween(minDate: number, maxDate: number, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>> {
        const response = await this.getPressuresByDateBetweenRaw({ minDate: minDate, maxDate: maxDate }, initOverrides);
        return await response.value();
    }

    /**
     * Get pressures by date between and disband ID
     */
    async getPressuresByDateBetweenAndDisbandIdRaw(requestParameters: GetPressuresByDateBetweenAndDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getPressuresByDateBetweenAndDisbandId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getPressuresByDateBetweenAndDisbandId.');
        }

        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getPressuresByDateBetweenAndDisbandId.');
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
            path: `/pressures/date/between/disband/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PressureFromJSON));
    }

    /**
     * Get pressures by date between and disband ID
     */
    async getPressuresByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>> {
        const response = await this.getPressuresByDateBetweenAndDisbandIdRaw({ minDate: minDate, maxDate: maxDate, disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Get pressures by disband ID
     */
    async getPressuresByDisbandIdRaw(requestParameters: GetPressuresByDisbandIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Pressure>>> {
        if (requestParameters.disbandId === null || requestParameters.disbandId === undefined) {
            throw new runtime.RequiredError('disbandId','Required parameter requestParameters.disbandId was null or undefined when calling getPressuresByDisbandId.');
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
            path: `/pressures/disbands/{disbandId}`.replace(`{${"disbandId"}}`, encodeURIComponent(String(requestParameters.disbandId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PressureFromJSON));
    }

    /**
     * Get pressures by disband ID
     */
    async getPressuresByDisbandId(disbandId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Pressure>> {
        const response = await this.getPressuresByDisbandIdRaw({ disbandId: disbandId }, initOverrides);
        return await response.value();
    }

    /**
     * Save pressure
     */
    async savePressureRaw(requestParameters: SavePressureRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Pressure>> {
        if (requestParameters.measureDTO === null || requestParameters.measureDTO === undefined) {
            throw new runtime.RequiredError('measureDTO','Required parameter requestParameters.measureDTO was null or undefined when calling savePressure.');
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
            path: `/pressures`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MeasureDTOToJSON(requestParameters.measureDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PressureFromJSON(jsonValue));
    }

    /**
     * Save pressure
     */
    async savePressure(measureDTO: MeasureDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Pressure> {
        const response = await this.savePressureRaw({ measureDTO: measureDTO }, initOverrides);
        return await response.value();
    }

}
