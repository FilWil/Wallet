import { FunctionReturnTypes, ReduxAction } from "../";
import { actionCreators } from "./actions";
import { ActionType, IAuthState } from "./types";

const initialState = Object.freeze<IAuthState>({
    token: '',
    tokenExpirationTime: 0,
    isAuthenticated: undefined,
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
            console.log('Login success');
            console.log(action);

            return {
                ...action.authData,
                isAuthenticated: action.authData.isAuthenticated,
            };
        case ActionType.LOGOUT:
        case ActionType.LOGIN_FAIL:
            console.log('Login failed');
            console.log(action);
            return {
                ...action.authData,
                isAuthenticated: action.authData.isAuthenticated,
            };
        case ActionType.RESET_STATE:
            return initialState;
        default:
            return state;
    }
};
