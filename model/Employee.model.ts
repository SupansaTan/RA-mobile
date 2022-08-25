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