import { Location, LocationDTO } from "client/disbeac";

export default interface ILocationApi {

    getLast1LocationByDateBetweenAndDisbeacId(minDate: number, maxDate: number, disbeacId: string): Promise<Location>

    getLocationsByDateBetweenAndDisbeacId(minDate: number, maxDate: number, disbeacId: string): Promise<Location[]>

    saveLocation(locationDTO: LocationDTO): Promise<Location>

    deleteLocationsByDisbeacId(disbeacId: string): Promise<Location[]>
}