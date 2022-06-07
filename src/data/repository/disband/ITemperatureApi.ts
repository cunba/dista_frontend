import { Temperature, MeasureDTO } from "client/disband";

export default interface ITemperatureApi {

    getLast1TemperatureByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Temperature>

    getTemperaturesByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Temperature[]>

    saveTemperature(measureDTO: MeasureDTO): Promise<Temperature>

    deleteTemperaturesByDisbandId(disbandId: string): Promise<Temperature[]>
}