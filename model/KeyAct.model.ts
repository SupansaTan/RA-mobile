export class KeyActModel {
  id: string;
  keyReq: string;
  standard: string;
  practice: string;
  frequency: string;
  order: number;
  lawId: string;
  isRelated?: boolean;
  notation?: string;
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