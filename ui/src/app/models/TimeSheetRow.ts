import { TimeSheetRowType } from "../types/typeDefs"


export class TimeSheetRow{

    private userId              : number
    private sheetId             : number
    private clientName          : string
    private clientProjectName   : string
    private description         : string
    private bill                : string
    private comment             : string
    private date                : string
    private month               : string
    private day                 : string
    private startTime           : string
    private endTime             : string
    private totalTime           : string

    constructor(rowSheetData: TimeSheetRowType){

        this.userId         = rowSheetData.user_id
        this.sheetId        = rowSheetData.time_sheet_id
        this.clientName     = rowSheetData.client
        this.clientProjectName  = rowSheetData.client_project_name
        this.description        = rowSheetData.description
        this.bill               = rowSheetData.bill
        this.comment            = rowSheetData.comment
        this.date               = rowSheetData.date
        this.month              = rowSheetData.month
        this.day                = rowSheetData.day
        this.startTime          = rowSheetData.start_time
        this.endTime            = rowSheetData.end_time
        this.totalTime          = rowSheetData.total_time

    }

    getUserId(): number {
        return this.userId
    }

    getSheetId(): number {
        return this.sheetId
    }

    getClientName(): string {
        return this.clientName
    }

    getClientProjectName(): string {
        return this.clientProjectName
    }

    getDescription(): string {
        return this.description
    }

    getBill(): string {
        return this.bill
    }

    getComment(): string {
        return this.comment
    }

    getDate(): string {
        return this.date
    }

    getMonth(): string {
        return this.month
    }

    getDay(): string {
        return this.day
    }

    getStartTime(): string {
        return this.startTime
    }

    getEndTime(): string {
        return this.endTime
    }

    getTotalTime(): string {
        return this.totalTime
    }

}