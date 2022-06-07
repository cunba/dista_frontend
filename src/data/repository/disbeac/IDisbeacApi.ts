import { Disbeac, DisbeacDTO, HandledResponse } from "client/disbeac";

export default interface IDisbeacApi {

    getDisbeacsByUserId(userId: string): Promise<Disbeac[]>

    getDisbeacByMac(mac: string): Promise<Disbeac>

    getDisbeacById(id: string): Promise<Disbeac>

    saveDisbeac(disbeacDTO: DisbeacDTO): Promise<Disbeac>

    updateDisbeac(id: string, disbeacDTO: DisbeacDTO): Promise<HandledResponse>

    updateDisbeacUserId(id: string, userId: string): Promise<HandledResponse>

    deleteDisbeac(id: string): Promise<Disbeac>

    deleteDisbeacsByUserId(userId: string): Promise<Disbeac[]>
}