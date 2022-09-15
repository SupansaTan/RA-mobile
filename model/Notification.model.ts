
export class NotifyContentModel {
  type: string;
  title: string;
  content: string;
  time: Date;
  readStatus: boolean;
}


export class NotificationListDataModel{
    date: Date;
    data: Array<NotifyContentModel>  
}

