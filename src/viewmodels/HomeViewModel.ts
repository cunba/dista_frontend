import { makeAutoObservable } from "mobx";
import RNLocation from "react-native-location";


export class HomeViewModel {
    constructor() {
        makeAutoObservable(this)
    }
}