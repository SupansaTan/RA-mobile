export class EmployeeProfileModel {
  email: string;
  firstName: string;
  lastName: string;
  roleList: Array<RoleInfoModel>;
}

export class RoleInfoModel {
  roleName: string;
  location: string;
}

export class UpdateEmployeeInfoModel {
  employeeId: string;
  darkTheme: boolean;
  notificationStatus: boolean;
  advanceNotify: number;
}

export class EmployeeInfoModel {
  employeeId: string;
  name: string;
}