export interface IActionType {
    readonly LOGIN: string;
    readonly LOGIN_SUCCESS: string;
    readonly LOGIN_FAIL: string;
    readonly LOGOUT: string;
    readonly RESET_STATE: string;
    readonly SET_AUTH_STATUS: string;
}

export type AuthStatus = "none" | "process" | "success" | "fail";

export type ICredentials = {
    email?: string;
    password?: string;
};

export type IAuthData = {
    token?: string;
    tokenExpirationTime?: number;
};

export type IAuthState = {
    readonly token?: string;
    readonly tokenExpirationTime?: number;
    readonly isLogin: boolean;
};

const _namespace = 'auth';

export const ActionType = Object.freeze<IActionType>({
    LOGIN: `${_namespace}/login`,
    LOGIN_SUCCESS: `${_namespace}/loginSuccess`,
    LOGIN_FAIL: `${_namespace}/loginFail`,
    LOGOUT: `${_namespace}/logout`,
    RESET_STATE: `${_namespace}/resetState`,
    SET_AUTH_STATUS: `${_namespace}/setAuthStatus`
});

export const AuthStatusEnum = Object.freeze<{ [key: string]: AuthStatus }>({
    NONE: "none",
    PROCESS: "process",
    SUCCESS: "success",
    FAIL: "fail"
});