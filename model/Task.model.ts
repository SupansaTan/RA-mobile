import { TaskDatetimeStatus } from "../enum/TaskDatetimeStatus.enum";
import { TaskProcess } from "../enum/TaskProcess.enum";

export class TaskDetailModel {
  taskId: string;
  taskTitle: string;
  locationName: string;
  dueDate: Date;
  process: TaskProcess;
  datetimeStatus: TaskDatetimeStatus;
}

export class TaskListSortByProcessModel {
  taskProcess: TaskProcess;
  taskList: Array<TaskDetailModel>
}

export class TaskInfoModel {
  taskId: string;
  taskTitle: string;
  locationName: string;
  dueDate: Date;
  actType: string;
  totalKeyAct: number;
  datetimeStatus: TaskDatetimeStatus;
}

export class TaskDataModel {
  taskId: string;
  taskTitle: string;
  locationName: string;
}

export class TaskAssessmentModel {
  taskId: string;
  employeeId: string;
  process: TaskProcess;
  keyActionList: Array<KeyActionAssessmentModel>;
}

export class KeyActionAssessmentModel {
  keyActId: string;
  keyReq?: string;
  isChecked: boolean;
  notation: string;
  responsePersonId?: Array<string>;
  cost?: number;
  dueDate?: Date;
}