import { ItemSheetSubmittedType } from "../types/typeDefs";
import { User } from "./User";



export class SheetSubmitted{

    comment: string
    dateTime: string
    sheetSubmittedId: number
    userId: number
    user: User

    constructor(data: ItemSheetSubmittedType){

        this.comment = data.comment
        this.dateTime = data.date_time
        this.sheetSubmittedId = data.sheet_submitted_id
        this.userId = data.user_id
        this.user = new User(data.user)

    }

    getComment(): string{
        return this.comment
    }

    getDateTime(): string{
        return this.dateTime
    }

    getSheetSubmittedId(): number{
        return this.sheetSubmittedId
    }

    getUserId(): number{
        return this.userId
    }

    getUser(): User{
        return this.user
    }

}