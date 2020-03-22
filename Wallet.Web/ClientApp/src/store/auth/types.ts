export interface IActionType {
    readonly LOGIN: string;
    readonly LOGIN_SUCCESS: string;
    readonly LOGIN_FAIL: string;
    readonly LOGOUT: string;
    readonly RESET_STATE: string;
    readonly REGISTER_SUCCESS: string;
    readonly REGISTER_FAILED: string;
}

export type ICredentials = {
    email?: string;
    password?: string;
};

export type IRegisterData = {
    email?: string;
    username?: string;
    password?: string;
}

export type IAuthData  = {
    success?: boolean,
    message?: string,
    item: {
        token?: string;
        tokenExpirationTime?: number;
        isAuthenticated?: boolean;
    }
};

export type IRegisteredUser = {
    success?: boolean,
    message?: string,
    item: {
        username?: string;
        email?: string;
        isRegistered: boolean;
    }
}

export type IAuthState = {
    readonly token?: string;
    readonly tokenExpirationTime?: number;
    readonly isAuthenticated?: boolean;
    readonly isRegistered?: boolean;
};

const _namespace = 'auth';

export const ActionType = Object.freeze<IActionType>({
    LOGIN: `${_namespace}/login`,
    LOGIN_SUCCESS: `${_namespace}/loginSuccess`,
    LOGIN_FAIL: `${_namespace}/loginFail`,
    LOGOUT: `${_namespace}/logout`,
    RESET_STATE: `${_namespace}/resetState`,
    REGISTER_SUCCESS: `${_namespace}/registerSuccess`,
    REGISTER_FAILED: `${_namespace}/registerFailed`,
});
