import React, {  useCallback, useState, useRef } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { renderToastifyMsg } from "../../utils";
import { ApplicationState } from "../../store";
import { toast, ToastId } from "react-toastify";
import { RoutesConfig } from "../../config/routes.config";
import {EmailInput, PasswordInput, RegisterControls} from "./child-components";
import {actionCreators, AuthStatusEnum, reducer} from "../../store/auth";
import { useTextInput } from "../../hooks/useTextInput";
import { useToggle } from "../../hooks/useToggle";
import UsernameInput from "./child-components/UsernameInput";
import {Authenticator, Registrator} from "../../components";

const MoneyLogo = require("../../assets/image/wallet-icon.png") as string;

type RegisterProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Register: React.FC<RegisterProps> = ({
                                         history,
                                         resetState,
                                         registerUserRequest,
                                         setAuthStatus,
                                         status,
    isRegistered
                                     }) => {
    const toastIdRef = useRef<ToastId>('');
    const [showPassword, toggleShowPassword] = useToggle(false);
    const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

    const emailInput = useTextInput('');
    const usernameInput = useTextInput('');
    const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

    const onFailedAuth = useCallback((): void => {
        toast.error(
            renderToastifyMsg('Registration has failed, please try again', 'exclamation-triangle')
        );
        resetState();
        setAuthStatus(AuthStatusEnum.NONE);
    }, [resetState, setAuthStatus]);

    const onSuccessfulAuth = useCallback((): void => {
        toast.success(
            renderToastifyMsg('Registration was successful, please login')
        );
        resetState();
        setAuthStatus(AuthStatusEnum.SUCCESS);
        history.push(RoutesConfig.Login.path)
    }, [history]);

    const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (status === AuthStatusEnum.PROCESS) {
            return;
        }

        if (!emailInput.hasValue || !passwordInput.hasValue || !usernameInput.hasValue) {
            // Run invalidInputs error and display toast notification (if one is not already active)
            setIsInputInvalid(true);
            if (!toast.isActive(toastIdRef.current)) {
                toastIdRef.current = toast.error(
                    renderToastifyMsg('Enter all new account details',
                        'exclamation-triangle')
                );
            }
        } else {
            // Clear any toast notifications and prepare state for Login request stub / run login request stub
            toast.dismiss();
            setIsInputInvalid(false);
            setAuthStatus(AuthStatusEnum.PROCESS);

            setTimeout(() => {
                registerUserRequest({
                    email: emailInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value
                });
            }, 0);
        }
    };

    return (
        <section className="section section-login">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title">Register</h3>
                    <p className="subtitle">Please fill below details to proceed</p>
                    <div className="box login-box">
                        <form onSubmit={handleRegister}>
                            <img
                                width="175"
                                id="login-img"
                                className='login-box__logo'
                                src={MoneyLogo}
                                alt="money-logo"
                            />
                            <EmailInput
                                textInput={emailInput}
                                isInputInvalid={isInputInvalid}
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
                            <RegisterControls/>
                        </form>
                        <Registrator
                            handleOnFail={onFailedAuth}
                            handleOnSuccess={onSuccessfulAuth}
                            authStatus={status}
                            isRegistered={isRegistered}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    isRegistered: state.auth.isRegistered,
    status: state.auth.status
});

export default connect(mapStateToProps, actionCreators)(Register);
