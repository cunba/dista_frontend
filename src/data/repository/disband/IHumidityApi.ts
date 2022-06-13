import { Humidity, MeasureDTO, MeasureResponseHumidity } from "client/disband";

export default interface IHumidityApi {

    getLast1HumidityByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Humidity>

    getHumiditiesByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<MeasureResponseHumidity>

    saveHumidity(measureDTO: MeasureDTO): Promise<Humidity>

    deleteHumiditiesByDisbandId(disbandId: string): Promise<Humidity[]>
}