import { JwtRequest, JwtResponse } from "client/disheap";

export default interface ILoginApi {

    login(jwtRequest: JwtRequest): Promise<JwtResponse>
    
}