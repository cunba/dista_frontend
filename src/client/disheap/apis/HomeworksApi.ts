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
    Homework,
    HomeworkFromJSON,
    HomeworkToJSON,
    HomeworkDTO,
    HomeworkDTOFromJSON,
    HomeworkDTOToJSON,
} from '../models';

export interface DeleteHomeworkRequest {
    id: string;
}

export interface DeleteHomeworksByUserIdRequest {
    userId: string;
}

export interface GetHomeworkByIdRequest {
    id: string;
}

export interface GetHomeworksByDeadlineBetweenAndSubjectIdAndUserIdRequest {
    minDate: number;
    maxDate: number;
    subjectId: string;
    userId: string;
}

export interface GetHomeworksByDeadlineBetweenAndUserIdRequest {
    minDate: number;
    maxDate: number;
    userId: string;
}

export interface GetHomeworksByUserIdRequest {
    userId: string;
}

export interface SaveHomeworkRequest {
    homeworkDTO: HomeworkDTO;
}

export interface UpdateHomeworkRequest {
    id: string;
    homeworkDTO: HomeworkDTO;
}

/**
 * HomeworksApi - interface
 * 
 * @export
 * @interface HomeworksApiInterface
 */
export interface HomeworksApiInterface {
    /**
     * 
     * @summary Delete homework
     * @param {string} id Homework ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    deleteHomeworkRaw(requestParameters: DeleteHomeworkRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Homework>>;

    /**
     * Delete homework
     */
    deleteHomework(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Homework>;

    /**
     * 
     * @summary Delete homeworks by user ID
     * @param {string} userId User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    deleteHomeworksByUserIdRaw(requestParameters: DeleteHomeworksByUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>>;

    /**
     * Delete homeworks by user ID
     */
    deleteHomeworksByUserId(userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>>;

    /**
     * 
     * @summary Get homework by ID
     * @param {string} id Homework ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    getHomeworkByIdRaw(requestParameters: GetHomeworkByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Homework>>;

    /**
     * Get homework by ID
     */
    getHomeworkById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Homework>;

    /**
     * 
     * @summary Get homeworks by deadline between and subject ID and user ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} subjectId Subject ID
     * @param {string} userId User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    getHomeworksByDeadlineBetweenAndSubjectIdAndUserIdRaw(requestParameters: GetHomeworksByDeadlineBetweenAndSubjectIdAndUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>>;

    /**
     * Get homeworks by deadline between and subject ID and user ID
     */
    getHomeworksByDeadlineBetweenAndSubjectIdAndUserId(minDate: number, maxDate: number, subjectId: string, userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>>;

    /**
     * 
     * @summary Get homeworks by deadline between and user ID
     * @param {number} minDate Min date
     * @param {number} maxDate Max date
     * @param {string} userId User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    getHomeworksByDeadlineBetweenAndUserIdRaw(requestParameters: GetHomeworksByDeadlineBetweenAndUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>>;

    /**
     * Get homeworks by deadline between and user ID
     */
    getHomeworksByDeadlineBetweenAndUserId(minDate: number, maxDate: number, userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>>;

    /**
     * 
     * @summary Get homeworks by user ID
     * @param {string} userId User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    getHomeworksByUserIdRaw(requestParameters: GetHomeworksByUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>>;

    /**
     * Get homeworks by user ID
     */
    getHomeworksByUserId(userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>>;

    /**
     * 
     * @summary Save homework
     * @param {HomeworkDTO} homeworkDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    saveHomeworkRaw(requestParameters: SaveHomeworkRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Homework>>;

    /**
     * Save homework
     */
    saveHomework(homeworkDTO: HomeworkDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Homework>;

    /**
     * 
     * @summary Update homework
     * @param {string} id Homework id
     * @param {HomeworkDTO} homeworkDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HomeworksApiInterface
     */
    updateHomeworkRaw(requestParameters: UpdateHomeworkRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>>;

    /**
     * Update homework
     */
    updateHomework(id: string, homeworkDTO: HomeworkDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string>;

}

/**
 * 
 */
export class HomeworksApi extends runtime.BaseAPI implements HomeworksApiInterface {

    /**
     * Delete homework
     */
    async deleteHomeworkRaw(requestParameters: DeleteHomeworkRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Homework>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteHomework.');
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
            path: `/homeworks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HomeworkFromJSON(jsonValue));
    }

    /**
     * Delete homework
     */
    async deleteHomework(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Homework> {
        const response = await this.deleteHomeworkRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Delete homeworks by user ID
     */
    async deleteHomeworksByUserIdRaw(requestParameters: DeleteHomeworksByUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling deleteHomeworksByUserId.');
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
            path: `/homeworks/users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HomeworkFromJSON));
    }

    /**
     * Delete homeworks by user ID
     */
    async deleteHomeworksByUserId(userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>> {
        const response = await this.deleteHomeworksByUserIdRaw({ userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * Get homework by ID
     */
    async getHomeworkByIdRaw(requestParameters: GetHomeworkByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Homework>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getHomeworkById.');
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
            path: `/homeworks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HomeworkFromJSON(jsonValue));
    }

    /**
     * Get homework by ID
     */
    async getHomeworkById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Homework> {
        const response = await this.getHomeworkByIdRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Get homeworks by deadline between and subject ID and user ID
     */
    async getHomeworksByDeadlineBetweenAndSubjectIdAndUserIdRaw(requestParameters: GetHomeworksByDeadlineBetweenAndSubjectIdAndUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getHomeworksByDeadlineBetweenAndSubjectIdAndUserId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getHomeworksByDeadlineBetweenAndSubjectIdAndUserId.');
        }

        if (requestParameters.subjectId === null || requestParameters.subjectId === undefined) {
            throw new runtime.RequiredError('subjectId','Required parameter requestParameters.subjectId was null or undefined when calling getHomeworksByDeadlineBetweenAndSubjectIdAndUserId.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getHomeworksByDeadlineBetweenAndSubjectIdAndUserId.');
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
            path: `/homeworks/deadline/between/subjects/{subjectId}/users/{userId}`.replace(`{${"subjectId"}}`, encodeURIComponent(String(requestParameters.subjectId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HomeworkFromJSON));
    }

    /**
     * Get homeworks by deadline between and subject ID and user ID
     */
    async getHomeworksByDeadlineBetweenAndSubjectIdAndUserId(minDate: number, maxDate: number, subjectId: string, userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>> {
        const response = await this.getHomeworksByDeadlineBetweenAndSubjectIdAndUserIdRaw({ minDate: minDate, maxDate: maxDate, subjectId: subjectId, userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * Get homeworks by deadline between and user ID
     */
    async getHomeworksByDeadlineBetweenAndUserIdRaw(requestParameters: GetHomeworksByDeadlineBetweenAndUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>> {
        if (requestParameters.minDate === null || requestParameters.minDate === undefined) {
            throw new runtime.RequiredError('minDate','Required parameter requestParameters.minDate was null or undefined when calling getHomeworksByDeadlineBetweenAndUserId.');
        }

        if (requestParameters.maxDate === null || requestParameters.maxDate === undefined) {
            throw new runtime.RequiredError('maxDate','Required parameter requestParameters.maxDate was null or undefined when calling getHomeworksByDeadlineBetweenAndUserId.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getHomeworksByDeadlineBetweenAndUserId.');
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
            path: `/homeworks/deadline/between/users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HomeworkFromJSON));
    }

    /**
     * Get homeworks by deadline between and user ID
     */
    async getHomeworksByDeadlineBetweenAndUserId(minDate: number, maxDate: number, userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>> {
        const response = await this.getHomeworksByDeadlineBetweenAndUserIdRaw({ minDate: minDate, maxDate: maxDate, userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * Get homeworks by user ID
     */
    async getHomeworksByUserIdRaw(requestParameters: GetHomeworksByUserIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Homework>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getHomeworksByUserId.');
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
            path: `/homeworks/users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HomeworkFromJSON));
    }

    /**
     * Get homeworks by user ID
     */
    async getHomeworksByUserId(userId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Homework>> {
        const response = await this.getHomeworksByUserIdRaw({ userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * Save homework
     */
    async saveHomeworkRaw(requestParameters: SaveHomeworkRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Homework>> {
        if (requestParameters.homeworkDTO === null || requestParameters.homeworkDTO === undefined) {
            throw new runtime.RequiredError('homeworkDTO','Required parameter requestParameters.homeworkDTO was null or undefined when calling saveHomework.');
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
            path: `/homeworks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: HomeworkDTOToJSON(requestParameters.homeworkDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HomeworkFromJSON(jsonValue));
    }

    /**
     * Save homework
     */
    async saveHomework(homeworkDTO: HomeworkDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Homework> {
        const response = await this.saveHomeworkRaw({ homeworkDTO: homeworkDTO }, initOverrides);
        return await response.value();
    }

    /**
     * Update homework
     */
    async updateHomeworkRaw(requestParameters: UpdateHomeworkRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateHomework.');
        }

        if (requestParameters.homeworkDTO === null || requestParameters.homeworkDTO === undefined) {
            throw new runtime.RequiredError('homeworkDTO','Required parameter requestParameters.homeworkDTO was null or undefined when calling updateHomework.');
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
            path: `/homeworks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: HomeworkDTOToJSON(requestParameters.homeworkDTO),
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Update homework
     */
    async updateHomework(id: string, homeworkDTO: HomeworkDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string> {
        const response = await this.updateHomeworkRaw({ id: id, homeworkDTO: homeworkDTO }, initOverrides);
        return await response.value();
    }

}
