import { TaskDatetimeStatus } from "../enum/TaskDatetimeStatus.enum";

export class TaskDetailModel {
  taskId: string;
  taskTitle: string;
  locationName: string;
  dueDate: Date;
  datetimeStatus: TaskDatetimeStatus;
}