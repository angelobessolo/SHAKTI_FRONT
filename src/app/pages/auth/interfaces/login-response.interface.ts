import { User } from "./user";

export interface LoginResponse {
    user:       User;
    userParams: UserParam[];
    token:      string;
}


export interface UserParam {
    moduleName:        string;
    moduleIcon:        string;
    moduleDescription: string;
    moduleRoute:       string;
    submodules:        Submodule[];
}

export interface Submodule {
    submoduleName:        string;
    submoduleIcon:        string;
    submoduleDescription: string;
    submoduleRoute:       string;
    submoduleItems:       string[];
}
