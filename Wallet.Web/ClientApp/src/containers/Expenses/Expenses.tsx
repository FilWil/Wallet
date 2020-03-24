import React from "react";
import { History } from "history";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators, reducer } from "../../store/auth";

type ExpensesProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & { readonly history: History };

const Expenses: React.FC<ExpensesProps> = ({
                                        history,
                                        resetState
                                    }) => {
    return (
        <section >
            EXPENSES
        </section>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
});

export default connect(mapStateToProps, actionCreators)(Expenses);
