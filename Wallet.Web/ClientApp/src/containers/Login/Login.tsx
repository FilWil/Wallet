import React, { useCallback, useState, useRef } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { renderToastifyMsg } from "../../utils";
import { ApplicationState } from "../../store";
import { toast, ToastId } from "react-toastify";
import { RoutesConfig } from "../../config/routes.config";
import {EmailInput, LoginControls, PasswordInput} from "./child-components";
import { actionCreators, reducer } from "../../store/auth";
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
                                         loginUserRequest
                                     }) => {
    const toastIdRef = useRef<ToastId>('');
    const [showPassword, toggleShowPassword] = useToggle(false);
    const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

    const emailInput = useTextInput('');
    const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

    const onFailedAuth = useCallback((): void => {
        console.log('fail');
        resetState();
    }, [resetState]);

    const onSuccessfulAuth = useCallback((): void => history.push(RoutesConfig.Register.path), [history]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

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

            setTimeout(() => {
                loginUserRequest({
                    email: emailInput.value,
                    password: passwordInput.value
                });
            }, 2250);
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
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, actionCreators)(Login);
