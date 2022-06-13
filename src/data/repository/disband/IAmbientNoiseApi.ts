import { AmbientNoise, MeasureDTO, MeasureResponseAmbientNoise } from "client/disband";

export default interface IAmbientNoiseApi {

    getLast1AmbientNoiseByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<AmbientNoise>

    getAmbientNoisesByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<MeasureResponseAmbientNoise>

    saveAmbientNoise(measureDTO: MeasureDTO): Promise<AmbientNoise>

    deleteAmbientNoisesByDisbandId(disbandId: string): Promise<AmbientNoise[]>
}