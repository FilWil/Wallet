import { AxiosResponse } from "axios";
import { BaseService } from "./base.service";
import { IAuthData, ICredentials } from "../store/auth/types";

/**
 * Auth API abstraction layer communication via Axios (typescript singleton pattern)
 */
class AuthService extends BaseService {
    private static _authService: AuthService;

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): AuthService {
        return (this._authService || (this._authService = new this("Auth")));
    }

    public async logoutAsync(): Promise<AxiosResponse> {
        return await this.$http.post("Logout");
    }

    public async loginAsync(credentials: ICredentials): Promise<IAuthData> {
        const { data } = await this.$http.post<IAuthData>("Login", credentials);
        return data;
    }
}

export const AuthApi = AuthService.Instance;
