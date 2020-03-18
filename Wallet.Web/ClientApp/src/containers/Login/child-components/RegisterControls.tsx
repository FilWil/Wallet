import React, { Fragment } from "react";
import { FontAwesomeIconMemo } from "../../../components";
import '../../../assets/style/scss/components/login-controls.scss'
import { NavLink } from "react-router-dom";

type RegisterControlsProps = {

};

const RegisterControls = React.memo<RegisterControlsProps>(() => (
    <Fragment>
        <button type="submit" className="button is-info is-medium is-fullwidth">
            <span>Register</span>
            <span className="icon">
                <FontAwesomeIconMemo icon="sign-in-alt" />
            </span>
        </button>
        <div className="register-container">
            <NavLink
                to={'/'}
                className='register-container__link'
                activeClassName='is-active'
            >
                Already have an account? Login
            </NavLink>
        </div>
    </Fragment>
));

RegisterControls.displayName = 'RegisterControls';

export default RegisterControls;