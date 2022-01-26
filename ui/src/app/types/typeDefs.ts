

export interface ErrorType{
    message     : string,
    error       : boolean
}


/**
 * HTTP REQUEST DATA TYPE
 */

export interface UserType{
    user_id     : string,
    name        : string,
    surname     : string,
    username    : string,
    type        : string,
    user_extras : SheetMetaDataType
}

export interface TimeSheetRowType{
    user_id             : number,
    client              : string,
    client_project_name : string,
    description         : string,
    bill                : string,
    comment             : string,
    date                : string,
    month               : string,
    day                 : string,
    start_time          : string,
    end_time            : string,
    total_time          : string,
    time_sheet_id       : number
}

export interface TimeSheetType{
    error           : boolean,
    message         : string,
    user            : UserType,
    entries         : TimeSheetRowType[],
    sheet_metadata  : SheetMetaDataType
}


export interface LoginRespType{
    message             : string,
    error               : boolean,
    access_token        : string,
    refresh_token       : string,
    user                : UserType
}

export interface RegisterRespType{
    message             : string,
    error               : boolean,
    user                : UserType
}

export interface AuthRespType{
    error       : string,
    message     : boolean
    user        : UserType
}


/**
 *  FORM DATA TYPE DEFINITIONS
 */

export interface TimesheetFormType{
    client              : string,
    project_name        : string,
    description         : string,
    bill                : string,
    comment             : string,
    start_time          : string,
    end_time            : string,
}

 export interface LoginFormType{
    email       : string,
    password    : string
}

export interface RegisterFormType{
    name        : string,
    surname     : string,
    username    : string,
    email       : string,
    type        : string
}


export interface SheetMetaDataType{
    billable_time           : string,
    non_billable_time       : string,
    days_worked?             : number
}

export interface ItemSheetSubmittedType{
    comment         : string,
    date_time       : string,
    sheet_submitted_id      : number,
    user_id                 : number,
    user                    : UserType
}

export interface SheetSubmittedType{
    error       : boolean,
    message     : string,
    submitted_sheets   : ItemSheetSubmittedType[]
}