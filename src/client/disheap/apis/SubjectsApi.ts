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
    Subject,
    SubjectFromJSON,
    SubjectToJSON,
    SubjectDTO,
    SubjectDTOFromJSON,
    SubjectDTOToJSON,
} from '../models';

export interface DeleteSubjectRequest {
    id: string;
}

export interface DeleteSubjectsBySchoolYearIdRequest {
    schoolYearId: string;
}

export interface GetSubjctesBySchoolYearIdRequest {
    schoolYearId: string;
}

export interface GetSubjectByIdRequest {
    id: string;
}

export interface SaveSubjectRequest {
    subjectDTO: SubjectDTO;
}

export interface UpdateSubjectRequest {
    id: string;
    subjectDTO: SubjectDTO;
}

/**
 * SubjectsApi - interface
 * 
 * @export
 * @interface SubjectsApiInterface
 */
export interface SubjectsApiInterface {
    /**
     * 
     * @summary Delete subject
     * @param {string} id Subject ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubjectsApiInterface
     */
    deleteSubjectRaw(requestParameters: DeleteSubjectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Subject>>;

    /**
     * Delete subject
     */
    deleteSubject(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Subject>;

    /**
     * 
     * @summary Delete subjects by school year ID
     * @param {string} schoolYearId School year ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubjectsApiInterface
     */
    deleteSubjectsBySchoolYearIdRaw(requestParameters: DeleteSubjectsBySchoolYearIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Subject>>>;

    /**
     * Delete subjects by school year ID
     */
    deleteSubjectsBySchoolYearId(schoolYearId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Subject>>;

    /**
     * 
     * @summary Get subjects by school year ID
     * @param {string} schoolYearId School year ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubjectsApiInterface
     */
    getSubjctesBySchoolYearIdRaw(requestParameters: GetSubjctesBySchoolYearIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Subject>>>;

    /**
     * Get subjects by school year ID
     */
    getSubjctesBySchoolYearId(schoolYearId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Subject>>;

    /**
     * 
     * @summary Get subject by ID
     * @param {string} id Subject ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubjectsApiInterface
     */
    getSubjectByIdRaw(requestParameters: GetSubjectByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Subject>>;

    /**
     * Get subject by ID
     */
    getSubjectById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Subject>;

    /**
     * 
     * @summary Save subject
     * @param {SubjectDTO} subjectDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubjectsApiInterface
     */
    saveSubjectRaw(requestParameters: SaveSubjectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Subject>>;

    /**
     * Save subject
     */
    saveSubject(subjectDTO: SubjectDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Subject>;

    /**
     * 
     * @summary Update subject
     * @param {string} id Subject id
     * @param {SubjectDTO} subjectDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubjectsApiInterface
     */
    updateSubjectRaw(requestParameters: UpdateSubjectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>>;

    /**
     * Update subject
     */
    updateSubject(id: string, subjectDTO: SubjectDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string>;

}

/**
 * 
 */
export class SubjectsApi extends runtime.BaseAPI implements SubjectsApiInterface {

    /**
     * Delete subject
     */
    async deleteSubjectRaw(requestParameters: DeleteSubjectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Subject>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteSubject.');
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
            path: `/subjects/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubjectFromJSON(jsonValue));
    }

    /**
     * Delete subject
     */
    async deleteSubject(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Subject> {
        const response = await this.deleteSubjectRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Delete subjects by school year ID
     */
    async deleteSubjectsBySchoolYearIdRaw(requestParameters: DeleteSubjectsBySchoolYearIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Subject>>> {
        if (requestParameters.schoolYearId === null || requestParameters.schoolYearId === undefined) {
            throw new runtime.RequiredError('schoolYearId','Required parameter requestParameters.schoolYearId was null or undefined when calling deleteSubjectsBySchoolYearId.');
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
            path: `/subjects/school-years/{schoolYearId}`.replace(`{${"schoolYearId"}}`, encodeURIComponent(String(requestParameters.schoolYearId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SubjectFromJSON));
    }

    /**
     * Delete subjects by school year ID
     */
    async deleteSubjectsBySchoolYearId(schoolYearId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Subject>> {
        const response = await this.deleteSubjectsBySchoolYearIdRaw({ schoolYearId: schoolYearId }, initOverrides);
        return await response.value();
    }

    /**
     * Get subjects by school year ID
     */
    async getSubjctesBySchoolYearIdRaw(requestParameters: GetSubjctesBySchoolYearIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Subject>>> {
        if (requestParameters.schoolYearId === null || requestParameters.schoolYearId === undefined) {
            throw new runtime.RequiredError('schoolYearId','Required parameter requestParameters.schoolYearId was null or undefined when calling getSubjctesBySchoolYearId.');
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
            path: `/subjects/school-years/{schoolYearId}`.replace(`{${"schoolYearId"}}`, encodeURIComponent(String(requestParameters.schoolYearId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SubjectFromJSON));
    }

    /**
     * Get subjects by school year ID
     */
    async getSubjctesBySchoolYearId(schoolYearId: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Subject>> {
        const response = await this.getSubjctesBySchoolYearIdRaw({ schoolYearId: schoolYearId }, initOverrides);
        return await response.value();
    }

    /**
     * Get subject by ID
     */
    async getSubjectByIdRaw(requestParameters: GetSubjectByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Subject>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSubjectById.');
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
            path: `/subjects/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubjectFromJSON(jsonValue));
    }

    /**
     * Get subject by ID
     */
    async getSubjectById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Subject> {
        const response = await this.getSubjectByIdRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Save subject
     */
    async saveSubjectRaw(requestParameters: SaveSubjectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Subject>> {
        if (requestParameters.subjectDTO === null || requestParameters.subjectDTO === undefined) {
            throw new runtime.RequiredError('subjectDTO','Required parameter requestParameters.subjectDTO was null or undefined when calling saveSubject.');
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
            path: `/subjects`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SubjectDTOToJSON(requestParameters.subjectDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubjectFromJSON(jsonValue));
    }

    /**
     * Save subject
     */
    async saveSubject(subjectDTO: SubjectDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Subject> {
        const response = await this.saveSubjectRaw({ subjectDTO: subjectDTO }, initOverrides);
        return await response.value();
    }

    /**
     * Update subject
     */
    async updateSubjectRaw(requestParameters: UpdateSubjectRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSubject.');
        }

        if (requestParameters.subjectDTO === null || requestParameters.subjectDTO === undefined) {
            throw new runtime.RequiredError('subjectDTO','Required parameter requestParameters.subjectDTO was null or undefined when calling updateSubject.');
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
            path: `/subjects/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SubjectDTOToJSON(requestParameters.subjectDTO),
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Update subject
     */
    async updateSubject(id: string, subjectDTO: SubjectDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string> {
        const response = await this.updateSubjectRaw({ id: id, subjectDTO: subjectDTO }, initOverrides);
        return await response.value();
    }

}