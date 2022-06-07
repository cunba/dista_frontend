import { Alarm, AlarmDTO, HandledResponse } from "client/disband";

export default interface IAlarmApi {

    getAlarmsByDisbandId(disbandId: string): Promise<Alarm[]>

    getAlarmById(id: string): Promise<Alarm>

    saveAlarm(alarmDTO: AlarmDTO): Promise<Alarm>

    updateAlarm(id: string, alarmDTO: AlarmDTO): Promise<HandledResponse>

    deleteAlarm(id: string): Promise<Alarm>

    deleteAlarmsByDisbandId(disbandId: string): Promise<Alarm[]>
}