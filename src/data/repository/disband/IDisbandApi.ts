import { Disband, DisbandDTO, HandledResponse } from "client/disband";

export default interface IDisbandApi {

    getDisbandsByUserId(userId: string): Promise<Disband[]>

    getDisbandByMac(mac: string): Promise<Disband>

    getDisbandById(id: string): Promise<Disband>

    saveDisband(disbandDTO: DisbandDTO): Promise<Disband>

    updateDisband(id: string, disbandDTO: DisbandDTO): Promise<HandledResponse>

    updateDisbandUserId(id: string, userId: string): Promise<HandledResponse>

    deleteDisband(id: string): Promise<Disband>

    deleteDisbandsByUserId(userId: string): Promise<Disband[]>
}