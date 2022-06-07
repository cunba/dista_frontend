import { Lightning, LightningDTO } from "client/disband";

export default interface ILightningApi {

    getLast1LightningByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Lightning>

    getLightningsByDateBetweenAndDisbandId(minDate: number, maxDate: number, disbandId: string): Promise<Lightning[]>

    saveLightning(lightningDTO: LightningDTO): Promise<Lightning>

    deleteLightningsByDisbandId(disbandId: string): Promise<Lightning[]>
}