
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
    Id: string;
    Process: number;
    Status: boolean;
    Notation: string;
    KeyActId: string;
}