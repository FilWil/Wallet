import React, { Fragment } from "react";
import { FontAwesomeIconMemo } from "../../../components";
import '../../../assets/style/scss/components/login-controls.scss'
import { ApplicationState } from "../../../store";
import { NavLink } from 'react-router-dom';


type LoginControlsProps = {

};

function handleClick(props) {
    console.log(props);
    props.path  = '/register'
}

const LoginControls = React.memo<LoginControlsProps>(() => (
    <Fragment>
        <button type="submit" className="button is-info is-medium is-fullwidth">
            <span>Login</span>
            <span className="icon">
             <FontAwesomeIconMemo icon="sign-in-alt" />
            </span>
        </button>
        <div className="register-container">
            <NavLink
                to={'/register'}
                className='register-container__link'
                activeClassName='is-active'
            >
                Don't have an account? Register
            </NavLink>
        </div>
    </Fragment>
));

LoginControls.displayName = 'LoginControls';

const mapStateToProps = (state: ApplicationState) => ({
    isLogin: state.auth.isLogin
});

export default LoginControls;