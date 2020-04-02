import { FunctionReturnTypes, ReduxAction } from "../";
import { actionCreators } from "./actions";
import { IUserState } from "./types";
import {ActionType} from "../auth";

const initialState = Object.freeze<IUserState>({
    id: '',
    username: '',
    email: '',
    balanceValue: 0
});

export const reducer = (
    state: IUserState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>,
) => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        default:
            return state;
    }
};
