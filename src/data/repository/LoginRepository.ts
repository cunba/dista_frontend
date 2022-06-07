import { JwtRequest } from "client/disheap";
import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import ILoginApi from "./ILoginApi";

export class LoginRepository extends DisheapBaseRepository<ILoginApi> {

    constructor() {
        super(DisheapApi.LoginApi, false)
    }

    async login(email: string, password: string) {
        const client = await DisheapApiClient.clientFor<ILoginApi>(DisheapApi.LoginApi)
        const jwtRequest: JwtRequest = {email: email, password: password}
        const result = await client.login(jwtRequest)
        return result
    }
}