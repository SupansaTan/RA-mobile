export class KeyActModel {
  id: string;
  keyReq: string;
  standard: string;
  practice: string;
  frequency: string;
  order: number;
  lawId: string;
  isChecked?: boolean;
  notation?: string;
  cost?: number;
  dueDate?: Date;
  responsePersonList?: Array<string>;
  responsePersonListLabel?: Array<string>;
}

export class KeyActApproveModel {
  id: string;
  keyReq: string;
  standard: string;
  practice: string;
  frequency: string;
  order: number;
  lawId: string;
  isApprove?: boolean;
  notation?: string;
}