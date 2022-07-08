import RoleModel from "./RoleModel";

export class AddOrEditUserModel {
	id?: number;
	email!: string;
	firstname!: string;
	lastname!: string;
	roleid!: number;
	name?: string;
	// password?: string;
}

export class UpdateProfileModel {
	email!: string;
	firstname!: string;
	lastname!: string;
	password?: string;
	// newPassword?: string;
	// confirmPassword?: string;
}

export default class UserModel {
	id?: number;
	email!: string;
	firstname!: string;
	lastname!: string;
	roleid!: number;
	role?: string;
	// rolename?: RoleModel['name'];
	password?: string;
}
