import { SheetMetaDataType, TimeSheetType } from "../types/typeDefs";
import { TimeSheetRow } from "./TimeSheetRow";
import { User } from "./User";


export class TimeSheet{

    private user: User
    private timeSheetRows: TimeSheetRow[] = []
    private sheetRows: number = 0
    private sheetMetaData: SheetMetaDataType = {
        billable_time : '00:00',
        days_worked : 0,
        non_billable_time : '00:00'
    }

    constructor(timeSheetData: TimeSheetType){

        this.user = new User(timeSheetData.user)

        this.sheetRows = timeSheetData.entries.length

        if(this.sheetRows > 0){

            timeSheetData.entries.forEach(timeSheetRow => {
                this.timeSheetRows.push(new TimeSheetRow(timeSheetRow))
            })

            this.sheetMetaData.billable_time = timeSheetData.sheet_metadata.billable_time
            this.sheetMetaData.non_billable_time = timeSheetData.sheet_metadata.non_billable_time
            this.sheetMetaData.days_worked = timeSheetData.sheet_metadata.days_worked

        }

    }

    getUser(): User {
        return this.user
    }

    getSheetNumbers(): number{
        return this.sheetRows
    }

    getTimeSheetRows(): TimeSheetRow[] {
        return this.timeSheetRows
    }

    getTimeSheetRow(index: number): TimeSheetRow | null {
        return index > this.timeSheetRows.length - 1 ? null : this.timeSheetRows[index]
    }

    getMetaData(): SheetMetaDataType{
        return this.sheetMetaData
    }

}