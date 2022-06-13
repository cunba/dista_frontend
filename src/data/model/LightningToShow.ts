import { Lightning } from "client/disband/models/Lightning"

export class LightningToPie {
    x: number
    y: number
    label: string = ' '

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class LightningToShow {
    blueLightningToPie: LightningToPie
    greenLightningToPie: LightningToPie
    redLightningToPie: LightningToPie
    data: number
    date: number

    constructor(lightning: Lightning, toPlot: boolean) {
        this.blueLightningToPie = (new LightningToPie(toPlot ? lightning.date! : 1, toPlot ? lightning.lightning! * ((lightning.blueLightning! - 390) * 100 / 90) / 3 / 100 : (lightning.blueLightning! - 390) * 100 / 90))
        this.greenLightningToPie = (new LightningToPie(toPlot ? lightning.date! : 2, toPlot ? lightning.lightning! * ((lightning.greenLightning! - 490) * 100 / 40) / 3 / 100 : (lightning.greenLightning! - 490) * 100 / 40))
        this.redLightningToPie = (new LightningToPie(toPlot ? lightning.date! : 3, toPlot ? lightning.lightning! * ((lightning.redLightning! - 550) * 100 / 250) / 3 / 100 : (lightning.redLightning! - 550) * 100 / 250))
        this.data = lightning.lightning!
        this.date = lightning.date!
    }
}