import { UserParam } from "./login-response.interface";
import { User } from "./user";

export interface CheckToken {
    user:       User;
    userParams: UserParam[];
    token:      string;
}



