import { Disorder } from "client/disheap/models/Disorder";

export default interface IDisorderApi {

    getAllDisorders(): Promise<Disorder[]>

    getDisorderById(id: string): Promise<Disorder>
    
}