
export class RelevantAssessmentModel {
    EmployeeId: string;
    TaskId: string;
    Process: number;
    KeyActList: Array<KeyActAssessmentDetail>
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
}