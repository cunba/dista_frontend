import { Oxygen, MeasureDTO, MeasureResponseOxygen } from "client/disband";

export default interface IOxygenApi {

    getLast1OxygenByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Oxygen>

    getOxygensByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<MeasureResponseOxygen>

    saveOxygen(measureDTO: MeasureDTO): Promise<Oxygen>

    deleteOxygensByDisbandId(disbandId: string): Promise<Oxygen[]>
}