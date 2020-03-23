import { FunctionReturnTypes, ReduxAction } from "../";
import { actionCreators } from "./actions";
import {ActionType, AuthStatusEnum, IAuthState} from "./types";

const initialState = Object.freeze<IAuthState>({
    token: '',
    tokenExpirationTime: 0,
    isAuthenticated: undefined,
    isRegistered: undefined,
    status: AuthStatusEnum.NONE
});

export const reducer = (
    state: IAuthState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>,
) => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        case ActionType.LOGIN:
            return state;
        case ActionType.LOGIN_SUCCESS:
            return {
                ...action.authData,
                isAuthenticated: action.authData.item.isAuthenticated,
                status: action.status
            };
        case ActionType.LOGOUT:
        case ActionType.LOGIN_FAIL:
            return {
                ...action.authData,
                isAuthenticated: action.authData.item.isAuthenticated,
                status: action.status
    };
        case ActionType.RESET_STATE:
            return initialState;
        case ActionType.REGISTER_SUCCESS:
            return {
                ...action.registeredUser,
                isRegistered: action.registeredUser.item.isRegistered,
                status: action.status
            };
        case ActionType.REGISTER_FAILED:
            return {
                ...action.registeredUser,
                isRegistered: action.registeredUser.item.isRegistered,
                status: action.status
            };
        case ActionType.SET_AUTH_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
};
