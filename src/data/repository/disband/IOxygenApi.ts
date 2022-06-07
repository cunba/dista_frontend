import { Oxygen, MeasureDTO } from "client/disband";

export default interface IOxygenApi {

    getLast1OxygenByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Oxygen>

    getOxygensByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Oxygen[]>

    saveOxygen(measureDTO: MeasureDTO): Promise<Oxygen>

    deleteOxygensByDisbandId(disbandId: string): Promise<Oxygen[]>
}