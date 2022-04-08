
export class EventType {
    id: string
    type: string
    color?: string | null

    constructor(id: string, type: string, color?: string) {
        this.id = id
        this.type = type
        this.color = color !== undefined ? color : null
    }
}