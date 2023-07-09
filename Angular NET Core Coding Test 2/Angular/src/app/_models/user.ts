import { UserRole } from "./userRole";
import { UserRight } from "./userRight";

export class User {
    userID: number;
    employeeNumber: number;
    LoginName: string;
    staffEmail: string;
    password: string;
    staffName: string;
    officeContactNo: string;
    costCenter: string;
    costCenterCode: string;
    costCenterID: number;
    company: string;
    companyCode: string;
    companyID: number;
    businessAreaDescription: string;
    // businessAreaCode: string;
    businessAreaID: number;
    token: string;
    // accessRole: string;
    // List of stringified of UserRolesID and UserRightsID
    userRoles: string;
    userRights: string;
    isLock: boolean;
    hide: boolean;
    EmploymentStatus: number;
    // Add back to aid compiling
    firstName: string;
    lastName: string;
    reports_AssetDetailsSavedCols: string[];


}