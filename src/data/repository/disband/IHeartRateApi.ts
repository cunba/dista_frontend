import { HeartRate, MeasureDTO } from "client/disband";

export default interface IHeartRateApi {

    getLast1HeartRateByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<HeartRate>

    getHeartRatesByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<HeartRate[]>

    saveHeartRate(measureDTO: MeasureDTO): Promise<HeartRate>

    deleteHeartRatesByDisbandId(disbandId: string): Promise<HeartRate[]>
}