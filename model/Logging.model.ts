
export class RelevantAssessmentModel {
    employeeId: string;
    taskId: string;
    process: number;
    keyActList: Array<KeyActAssessmentDetail>
}

export class KeyActAssessmentDetail {
   keyActId: string;
   isRelated?: boolean;
   notation?: string;
}

export class LoggingAssessmentModel {
    id: string;
    process: number;
    status: boolean;
    notation: string;
    keyActId: string;
    cost?: number;
    dueDate?: Date;
    responsiblePersonList?: Array<string>;
}

export class AllKeyActLoggingAssessmentModel {
    keyActOrder: number;
    loggingList: Array<KeyActLoggingModel>;
}

export class KeyActLoggingModel {
    createDate: Date;
    employeeName: string;
    taskProcessTitle: string;
}