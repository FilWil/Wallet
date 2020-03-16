import React, { Fragment } from "react";
import { FontAwesomeIconMemo } from "../../../components";

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
    </Fragment>
));

LoginControls.displayName = 'LoginControls';

export default LoginControls;