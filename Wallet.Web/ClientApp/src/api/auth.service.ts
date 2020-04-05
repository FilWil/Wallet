import { AxiosResponse } from "axios";
import { BaseService } from "./base.service";
import {IAuthData, ICredentials, IRegisterData, IRegisteredUser} from "../store/auth/types";

/**
 * Auth API abstraction layer communication via Axios (typescript singleton pattern)
 */
class AuthService extends BaseService {
    private static _authService: AuthService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): AuthService {
        return (this._authService || (this._authService = new this("users")));
    }

    public async loginAsync(credentials: ICredentials): Promise<IAuthData> {
        const { data } = await this.$http.post<IAuthData>("login", credentials);
        return data;
    }

    public async registerAsync(registerData: IRegisterData): Promise<IRegisteredUser> {
        const { data } = await this.$http.post<IRegisteredUser>("register", registerData);
        return data;
    }
}

export const AuthApi = AuthService.Instance;
