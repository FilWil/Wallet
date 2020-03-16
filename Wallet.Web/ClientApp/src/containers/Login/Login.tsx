import React, { useEffect, useCallback, useState, useRef } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { renderToastifyMsg } from "../../utils";
import { ApplicationState } from "../../store";
import { toast, ToastId } from "react-toastify";
import { Authenticator } from "../../components";
import { RoutesConfig } from "../../config/routes.config";
import { UsernameInput, PasswordInput, LoginControls } from "./child-components";
import { actionCreators, AuthStatusEnum, reducer } from "../../store/auth";
import { useTextInput } from "../../hooks/useTextInput";
import { useToggle } from "../../hooks/useToggle";

const MoneyLogo = require("../../assets/image/money-logo.png") as string;

type LoginProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Login: React.FC<LoginProps> = ({
                                         status,
                                         history,
                                         resetState,
                                         setAuthStatus,
                                         loginUserRequest
                                     }) => {
    const toastIdRef = useRef<ToastId>('');
    const [showPassword, toggleShowPassword] = useToggle(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

    const usernameInput = useTextInput('');
    const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

    const onFailedAuth = useCallback((): void => {
        resetState();
        setAuthStatus(AuthStatusEnum.NONE);
    }, [resetState, setAuthStatus]);

    const onRememberMeCheck = useCallback((checked: boolean): void => setRememberMe(checked), []);
    const onSuccessfulAuth = useCallback((): void => history.push(RoutesConfig.Dashboard.path), [history]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (status === AuthStatusEnum.PROCESS) {
            return;
        }

        if (!usernameInput.hasValue || !passwordInput.hasValue) {
            // Run invalidInputs error and display toast notification (if one is not already active)
            setIsInputInvalid(true);
            if (!toast.isActive(toastIdRef.current)) {
                toastIdRef.current = toast.error(
                    renderToastifyMsg('Enter user name/password',
                        'exclamation-triangle')
                );
            }
        } else {
            // Clear any toast notifications and prepare state for Login request stub / run login request stub
            toast.dismiss();
            setIsInputInvalid(false);
            setAuthStatus(AuthStatusEnum.PROCESS);

            setTimeout(() => {
                loginUserRequest({
                    rememberMe,
                    username: usernameInput.value,
                    password: passwordInput.value
                });
            }, 2250);
        }
    };

    return (
        <section className="section section-login">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title">Login</h3>
                    <p className="subtitle">Please login to proceed</p>
                    <div className="box login-box">
                        <form onSubmit={handleLogin}>
                            <img
                                width="175"
                                id="login-img"
                                src={MoneyLogo}
                                alt="money-logo"
                            />
                            <UsernameInput
                                textInput={usernameInput}
                                isInputInvalid={isInputInvalid}
                            />
                            <PasswordInput
                                textInput={passwordInput}
                                showPassword={showPassword}
                                isInputInvalid={isInputInvalid}
                                toggleShowPassword={toggleShowPassword}
                            />
                            <LoginControls
                                rememberMe={rememberMe}
                                handleRememberMeCheck={onRememberMeCheck}
                            />
                        </form>
                        <Authenticator
                            authStatus={status}
                            handleOnFail={onFailedAuth}
                            handleOnSuccess={onSuccessfulAuth}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    status: state.auth.status
});

export default connect(mapStateToProps, actionCreators)(Login);
