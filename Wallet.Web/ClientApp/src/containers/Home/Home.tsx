import React from "react";
import { History } from "history";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators, reducer } from "../../store/auth";

type LoginProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Home: React.FC<LoginProps> = ({
                                         history,
                                         resetState
                                     }) => {
    return (
        <section >
            <div>Home</div>
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
});

export default connect(mapStateToProps, actionCreators)(Home);
