import { CallbackFunction } from "../../types";
import { AppThunkAction, ReduxAction } from "../";
import { ActionType, IAuthUser, ICredentials, AuthStatusEnum, AuthStatus } from "./types";
import { AuthApi } from "../../api/auth.service";

export const actionCreators = {
    resetState: (): ReduxAction => ({
        type: ActionType.RESET_STATE
    }),
    setAuthStatus: (status: AuthStatus): ReduxAction => ({
        status,
        type: ActionType.SET_AUTH_STATUS
    }),
    loginUserRequest: (credentials: ICredentials): AppThunkAction<ReduxAction> => (dispatch) => {
        AuthApi.loginAsync(credentials)
            .then((authUser: IAuthUser) => {
                const { status } = authUser;
                if (status === AuthStatusEnum.SUCCESS) {
                    dispatch({
                        authUser,
                        type: ActionType.LOGIN_SUCCESS
                    });
                } else {
                    dispatch({ type: ActionType.LOGIN_FAIL });
                }
            });
    },
    logoutUserRequest: (handleRouteCallback: CallbackFunction): AppThunkAction<ReduxAction> => (dispatch) => {
        AuthApi.logoutAsync()
            .then(() => {
                handleRouteCallback();
                dispatch({ type: ActionType.RESET_STATE });
            });
    }
};
