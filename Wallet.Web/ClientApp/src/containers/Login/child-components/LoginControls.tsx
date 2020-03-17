import React, { Fragment } from "react";
import { FontAwesomeIconMemo } from "../../../components";
import '../../../assets/style/scss/components/login-controls.scss'

type LoginControlsProps = {

};

const LoginControls = React.memo<LoginControlsProps>(() => (
    <Fragment>
        <button type="submit" className="button is-info is-medium is-fullwidth">
            <span>Login</span>
            <span className="icon">
        <FontAwesomeIconMemo icon="sign-in-alt" />
      </span>
        </button>
        <div className="register-container">
            <a className="register-container__link">Don't have an account? Register</a>
        </div>
    </Fragment>
));

LoginControls.displayName = 'LoginControls';

export default LoginControls;