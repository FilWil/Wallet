export interface IUserActionType {
    readonly GET_USER: string;
}

export type IUserState = {
    readonly id?: string;
    readonly username?: string;
    readonly email?: string;
    readonly balanceValue?: number;
};

export interface IUser {
    balanceValue?: number;
}

const _namespace = 'user';

export const UserActionType = Object.freeze<IUserActionType>({
    GET_USER: `${_namespace}/getUser`,
});

