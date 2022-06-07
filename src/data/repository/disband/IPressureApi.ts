import { Pressure, MeasureDTO } from "client/disband";

export default interface IPressureApi {

    getLast1PressureByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Pressure>

    getPressuresByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Pressure[]>

    savePressure(measureDTO: MeasureDTO): Promise<Pressure>

    deletePressuresByDisbandId(disbandId: string): Promise<Pressure[]>
}