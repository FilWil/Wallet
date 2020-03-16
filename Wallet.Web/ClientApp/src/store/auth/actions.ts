import { CallbackFunction } from "../../types";
import { AppThunkAction, ReduxAction } from "../";
import { ActionType, IAuthData, ICredentials, AuthStatusEnum, AuthStatus } from "./types";
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
            .then((authData: IAuthData ) => {

            });
    }
};
