import { History } from 'history';
import { ApplicationState } from './index';
import { reducer as AuthReducer } from './auth';
import { reducer as UserReducer } from './user';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Takes all the individual reducers and creates a single state object by combining them.
 */
export const createRootReducer = (history: History): Reducer<ApplicationState> => (
    combineReducers<ApplicationState>({
        user: UserReducer,
        auth: AuthReducer,
        router: connectRouter(history)
    })
);