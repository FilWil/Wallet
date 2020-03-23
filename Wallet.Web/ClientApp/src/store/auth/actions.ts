import { AppThunkAction, ReduxAction } from "../";
import {ActionType, AuthStatus, AuthStatusEnum, IAuthData, ICredentials, IRegisterData, IRegisteredUser} from "./types";
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
                if (!!authData.item.isAuthenticated) {
                    dispatch({
                        authData,
                        type: ActionType.LOGIN_SUCCESS,
                        status: AuthStatusEnum.SUCCESS
                    })
                } else {
                    dispatch({
                        authData,
                        type: ActionType.LOGIN_FAIL,
                        status: AuthStatusEnum.FAIL
                    })
                }
            });
    },
    registerUserRequest: (registerData: IRegisterData): AppThunkAction<ReduxAction> => (dispatch => {
        AuthApi.registerAsync(registerData)
            .then((registeredUser: IRegisteredUser) => {
                if (registeredUser.success) {
                    dispatch({
                        registeredUser,
                        type: ActionType.REGISTER_SUCCESS
                    })
                }
                else if (!registeredUser.success) {
                    dispatch({
                        registeredUser,
                        type: ActionType.REGISTER_FAILED
                    })
                }
        });
    })
};
