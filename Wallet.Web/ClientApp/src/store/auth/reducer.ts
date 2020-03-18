import { FunctionReturnTypes, ReduxAction } from "../";
import { actionCreators } from "./actions";
import { ActionType, IAuthState } from "./types";

const initialState = Object.freeze<IAuthState>({
    token: '',
    tokenExpirationTime: 0,
    isLogin: true,
});

export const reducer = (
    state: IAuthState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>
) => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        case ActionType.LOGIN:
            return state;
        case ActionType.SET_AUTH_STATUS:
            return {
                ...state,
                status: action.status
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                ...action.authUser,
                isAuthenticated: true
            };
        case ActionType.LOGOUT:
        case ActionType.LOGIN_FAIL:
        case ActionType.RESET_STATE:
            return initialState;
        default:
            return state;
    }
};
