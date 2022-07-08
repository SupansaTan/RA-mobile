import { TaskDatetimeStatus } from "../enum/TaskDatetimeStatus.enum";

export interface TaskContentModel {
  title: string
  datetime: string
  timestatus: TaskDatetimeStatus
  assign?: string
}

export interface TaskItemModel {
  taskId: string;
  title: string;
  taskType: string;
  duedate: string;
  isToday: boolean;
}