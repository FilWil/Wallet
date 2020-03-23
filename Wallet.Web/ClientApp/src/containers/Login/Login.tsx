import React, { useCallback, useEffect, useState, useRef } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { renderToastifyMsg } from "../../utils";
import { ApplicationState } from "../../store";
import { toast, ToastId } from "react-toastify";
import { RoutesConfig } from "../../config/routes.config";
import {EmailInput, LoginControls, PasswordInput} from "./child-components";
import {actionCreators, AuthStatusEnum, reducer} from "../../store/auth";
import { useTextInput } from "../../hooks/useTextInput";
import { useToggle } from "../../hooks/useToggle";
import {Authenticator} from "../../components";

const MoneyLogo = require("../../assets/image/wallet-icon.png") as string;

type LoginProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Login: React.FC<LoginProps> = ({
                                         history,
                                         resetState,
                                         loginUserRequest,
                                         isAuthenticated,
                                         setAuthStatus,
    status
                                     }) => {
    const toastIdRef = useRef<ToastId>('');
    const [showPassword, toggleShowPassword] = useToggle(false);
    const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

    const emailInput = useTextInput('');
    const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

    const onFailedAuth = useCallback((): void => {
        toast.error(
            renderToastifyMsg('Login failed', 'exclamation-triangle')
        );
        setAuthStatus(AuthStatusEnum.FAIL);
        resetState();
        setAuthStatus(AuthStatusEnum.NONE);
    }, [resetState, setAuthStatus]);

    const onSuccessfulAuth = useCallback((): void => {
        setAuthStatus(AuthStatusEnum.SUCCESS);
        history.push(RoutesConfig.Home.path)
    }, [history, setAuthStatus]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (status === AuthStatusEnum.PROCESS) {
            return;
        }

        if (!emailInput.hasValue || !passwordInput.hasValue) {
            // Run invalidInputs error and display toast notification (if one is not already active)
            setIsInputInvalid(true);
            if (!toast.isActive(toastIdRef.current)) {
                toastIdRef.current = toast.error(
                    renderToastifyMsg('Enter email/password',
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
                    email: emailInput.value,
                    password: passwordInput.value
                });
            }, 0);
        }
    };

    return (
        <section >
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title">Login</h3>
                    <p className="subtitle">Please login to proceed</p>
                    <div className="box login-box">
                        <form onSubmit={handleLogin}>
                            <img
                                width="175"
                                className='login-box__logo'
                                id="login-img"
                                src={MoneyLogo}
                                alt="money-logo"
                            />
                            <EmailInput
                                textInput={emailInput}
                                isInputInvalid={isInputInvalid}
                            />
                            <PasswordInput
                                textInput={passwordInput}
                                showPassword={showPassword}
                                isInputInvalid={isInputInvalid}
                                toggleShowPassword={toggleShowPassword}
                            />
                            <LoginControls/>
                        </form>
                        <Authenticator
                            handleOnFail={onFailedAuth}
                            handleOnSuccess={onSuccessfulAuth}
                            isAuthenticated={isAuthenticated}
                            authStatus={status}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    status: state.auth.status
});

export default connect(mapStateToProps, actionCreators)(Login);
