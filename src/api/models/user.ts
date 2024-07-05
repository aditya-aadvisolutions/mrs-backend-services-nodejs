export interface User{
    id: string;
    firstName: string;
    lastName: string;
    loginName: string;
    password: string;
    phoneNo: string;
    roleName: string;
    email: string;
    companyId: string;
    companyName: string;
    token?: string;
    refreshToken?: string;
    expiration?: Date | number;
    filePreferences: string;
}