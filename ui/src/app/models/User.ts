import { SheetMetaDataType, UserType } from "../types/typeDefs"
import {createAvatar} from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'


export class User{

    private name: string
    private surname: string
    private username: string
    private type: string
    private userId: string
    private image: string
    private bill: SheetMetaDataType = {
        billable_time     : "00:00",
        non_billable_time : "00:00"
    }

    constructor(userData: UserType){

        this.name = userData.name
        this.surname = userData.surname
        this.username = userData.username
        this.type = userData.type
        this.userId = userData.user_id
        this.image = createAvatar(style, {
            seed: this.username,
          });

        if(userData.user_extras){
            this.bill.billable_time = userData.user_extras.billable_time
            this.bill.non_billable_time = userData.user_extras.non_billable_time
        }

    }

    getBill(): SheetMetaDataType {
        return this.bill
    }

    getImage(): string {
        return this.image
    }

    isAdmin(): boolean {
        return this.type === 'admin'
    }

    getId(){
        return this.userId
    }

    getName(): string {
        return this.name
    }

    getSurname(): string {
        return this.surname
    }

    getUsername(): string {
        return this.username
    }

    getType(): string {
        return this.type
    }

}