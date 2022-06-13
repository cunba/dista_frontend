import DisheapApiClient, { DisheapApi } from "infrastructure/data/DisheapApiClient";
import { DisheapBaseRepository } from "infrastructure/data/repository/DisheapBaseRepository";
import IDisorderApi from "../IDisorderApi";

export class DisorderRepository extends DisheapBaseRepository<IDisorderApi> {
    
    static tries = 0

    constructor() {
        super(DisheapApi.DisorderApi, false)
    }

    async getAll() {
        try {
            const client = await this.apiClient
            const result = await client.getAllDisorders()
            DisorderRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisorderRepository.tries < 1) {
                DisorderRepository.tries++
                this.getAll()
            } else {
                DisorderRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getDisorderById(id)
            DisorderRepository.tries = 0
            return result
        } catch (e) {
            if (e && DisorderRepository.tries < 1) {
                DisorderRepository.tries++
                this.getById(id)
            } else {
                DisorderRepository.tries = 0
                throw e
            }
        }
    }
}