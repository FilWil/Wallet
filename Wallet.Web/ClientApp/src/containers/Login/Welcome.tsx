import React, { useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";

import { actionCreators, reducer } from "../../store/auth";
import Login from "./Login";
import Register from "./Register";

type WelcomeProps = ReturnType<typeof reducer>;

const Welcome: React.FC<WelcomeProps> = ({ }) => {
    const [isLogin] = useState<boolean>(true);

    function IsLogin(props) {
        const isLogin = props.isLogin;

        if (isLogin){
            return <Login/>
        } else {
            return <Register/>
        }
    }

    return (
        <section className="section section-login">
            <div className="container has-text-centered">
                <div  className="column is-4 is-offset-4">
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    status: state.auth.status
});

export default connect(mapStateToProps, actionCreators)(Welcome);
