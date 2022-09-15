
export class TrackingModel 
{   
    locationName: string ;
    doneTask: Array<ResponsibilityDetail> ; 
    inProgressTask: Array<ResponsibilityDetail> ; 
}

export class ResponsibilityDetail
{
    taskId: string;
    taskTitle: string;
    dueDate: Date;
    status: boolean;
    employeeName: string;
    datetimeStatus: number;
    
}