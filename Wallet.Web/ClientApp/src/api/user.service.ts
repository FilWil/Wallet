import { AxiosResponse } from "axios";
import { BaseService } from "./base.service";
import {IUser} from "../store/user";

class UserService extends BaseService {
    private static _userService: UserService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): UserService {
        return (this._userService || (this._userService = new this("users")));
    }

    public async getUserAsync(id: string): Promise<IUser> {
        const { data } = await this.$http.get(`${id}`);
        return data;
    }
}

export const UserApi = UserService.Instance;
