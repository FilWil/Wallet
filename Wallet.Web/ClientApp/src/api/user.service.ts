import { BaseService } from "./base.service";
import axios from 'axios';
import {User} from "../models/User";

class UserService extends BaseService {
    private static _userService: UserService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): UserService {
        return (this._userService || (this._userService = new this("users")));
    }

    public async getUserAsync(): Promise<User> {
        const { data } = await this.$http.get(`${sessionStorage.getItem("userId")}`);
        return data.item;
    }
}

export const UserApi = UserService.Instance;
