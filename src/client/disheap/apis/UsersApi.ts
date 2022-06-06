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
    HandledResponse,
    HandledResponseFromJSON,
    HandledResponseToJSON,
    PasswordChangeDTO,
    PasswordChangeDTOFromJSON,
    PasswordChangeDTOToJSON,
    UpdateUserDTO,
    UpdateUserDTOFromJSON,
    UpdateUserDTOToJSON,
    UserDTO,
    UserDTOFromJSON,
    UserDTOToJSON,
    UserModel,
    UserModelFromJSON,
    UserModelToJSON,
} from '../models';

export interface DeleteUserRequest {
    id: string;
}

export interface GetUserByEmailRequest {
    email: string;
}

export interface GetUserByIdRequest {
    id: string;
}

export interface SaveUserRequest {
    userDTO: UserDTO;
}

export interface UpdateUserRequest {
    id: string;
    updateUserDTO: UpdateUserDTO;
}

export interface UpdateUserEmailRequest {
    id: string;
    email: string;
}

export interface UpdateUserPasswordRequest {
    id: string;
    passwordChangeDTO: PasswordChangeDTO;
}

/**
 * UsersApi - interface
 * 
 * @export
 * @interface UsersApiInterface
 */
export interface UsersApiInterface {
    /**
     * 
     * @summary Delete user
     * @param {string} id User id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>>;

    /**
     * Delete user
     */
    deleteUser(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel>;

    /**
     * 
     * @summary Get user by email
     * @param {string} email User email
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    getUserByEmailRaw(requestParameters: GetUserByEmailRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>>;

    /**
     * Get user by email
     */
    getUserByEmail(email: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel>;

    /**
     * 
     * @summary Get user by ID
     * @param {string} id User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    getUserByIdRaw(requestParameters: GetUserByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>>;

    /**
     * Get user by ID
     */
    getUserById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel>;

    /**
     * 
     * @summary Save user
     * @param {UserDTO} userDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    saveUserRaw(requestParameters: SaveUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>>;

    /**
     * Save user
     */
    saveUser(userDTO: UserDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel>;

    /**
     * 
     * @summary Update user
     * @param {string} id User id
     * @param {UpdateUserDTO} updateUserDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HandledResponse>>;

    /**
     * Update user
     */
    updateUser(id: string, updateUserDTO: UpdateUserDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HandledResponse>;

    /**
     * 
     * @summary Update user\'s email
     * @param {string} id User id
     * @param {string} email User email
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    updateUserEmailRaw(requestParameters: UpdateUserEmailRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HandledResponse>>;

    /**
     * Update user\'s email
     */
    updateUserEmail(id: string, email: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HandledResponse>;

    /**
     * 
     * @summary Update user\'s password
     * @param {string} id User id
     * @param {PasswordChangeDTO} passwordChangeDTO 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    updateUserPasswordRaw(requestParameters: UpdateUserPasswordRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HandledResponse>>;

    /**
     * Update user\'s password
     */
    updateUserPassword(id: string, passwordChangeDTO: PasswordChangeDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HandledResponse>;

}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI implements UsersApiInterface {

    /**
     * Delete user
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteUser.');
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
            path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserModelFromJSON(jsonValue));
    }

    /**
     * Delete user
     */
    async deleteUser(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel> {
        const response = await this.deleteUserRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Get user by email
     */
    async getUserByEmailRaw(requestParameters: GetUserByEmailRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>> {
        if (requestParameters.email === null || requestParameters.email === undefined) {
            throw new runtime.RequiredError('email','Required parameter requestParameters.email was null or undefined when calling getUserByEmail.');
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
            path: `/users/emails/{email}`.replace(`{${"email"}}`, encodeURIComponent(String(requestParameters.email))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserModelFromJSON(jsonValue));
    }

    /**
     * Get user by email
     */
    async getUserByEmail(email: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel> {
        const response = await this.getUserByEmailRaw({ email: email }, initOverrides);
        return await response.value();
    }

    /**
     * Get user by ID
     */
    async getUserByIdRaw(requestParameters: GetUserByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getUserById.');
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
            path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserModelFromJSON(jsonValue));
    }

    /**
     * Get user by ID
     */
    async getUserById(id: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel> {
        const response = await this.getUserByIdRaw({ id: id }, initOverrides);
        return await response.value();
    }

    /**
     * Save user
     */
    async saveUserRaw(requestParameters: SaveUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UserModel>> {
        if (requestParameters.userDTO === null || requestParameters.userDTO === undefined) {
            throw new runtime.RequiredError('userDTO','Required parameter requestParameters.userDTO was null or undefined when calling saveUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserDTOToJSON(requestParameters.userDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserModelFromJSON(jsonValue));
    }

    /**
     * Save user
     */
    async saveUser(userDTO: UserDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UserModel> {
        const response = await this.saveUserRaw({ userDTO: userDTO }, initOverrides);
        return await response.value();
    }

    /**
     * Update user
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HandledResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUser.');
        }

        if (requestParameters.updateUserDTO === null || requestParameters.updateUserDTO === undefined) {
            throw new runtime.RequiredError('updateUserDTO','Required parameter requestParameters.updateUserDTO was null or undefined when calling updateUser.');
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
            path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserDTOToJSON(requestParameters.updateUserDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HandledResponseFromJSON(jsonValue));
    }

    /**
     * Update user
     */
    async updateUser(id: string, updateUserDTO: UpdateUserDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HandledResponse> {
        const response = await this.updateUserRaw({ id: id, updateUserDTO: updateUserDTO }, initOverrides);
        return await response.value();
    }

    /**
     * Update user\'s email
     */
    async updateUserEmailRaw(requestParameters: UpdateUserEmailRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HandledResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUserEmail.');
        }

        if (requestParameters.email === null || requestParameters.email === undefined) {
            throw new runtime.RequiredError('email','Required parameter requestParameters.email was null or undefined when calling updateUserEmail.');
        }

        const queryParameters: any = {};

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
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
            path: `/users/{id}/email`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HandledResponseFromJSON(jsonValue));
    }

    /**
     * Update user\'s email
     */
    async updateUserEmail(id: string, email: string, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HandledResponse> {
        const response = await this.updateUserEmailRaw({ id: id, email: email }, initOverrides);
        return await response.value();
    }

    /**
     * Update user\'s password
     */
    async updateUserPasswordRaw(requestParameters: UpdateUserPasswordRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HandledResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUserPassword.');
        }

        if (requestParameters.passwordChangeDTO === null || requestParameters.passwordChangeDTO === undefined) {
            throw new runtime.RequiredError('passwordChangeDTO','Required parameter requestParameters.passwordChangeDTO was null or undefined when calling updateUserPassword.');
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
            path: `/users/{id}/password`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PasswordChangeDTOToJSON(requestParameters.passwordChangeDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HandledResponseFromJSON(jsonValue));
    }

    /**
     * Update user\'s password
     */
    async updateUserPassword(id: string, passwordChangeDTO: PasswordChangeDTO, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HandledResponse> {
        const response = await this.updateUserPasswordRaw({ id: id, passwordChangeDTO: passwordChangeDTO }, initOverrides);
        return await response.value();
    }

}