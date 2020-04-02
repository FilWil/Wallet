import { reducer as AuthReducer } from './auth';
import { reducer  as UserReducer } from './user';
import { RouterState } from "connected-react-router";
import { configureStore } from './configureStore';
import { createRootReducer } from './rootReducer';

// The top-level state object
export interface ApplicationState {
    readonly router: RouterState;
    readonly auth: ReturnType<typeof AuthReducer>;
    readonly user: ReturnType<typeof UserReducer>;
}

// Type for all redux actions - takes the action type and then an optional, variable amount of additional key-value pairs
export type ReduxAction = { readonly type: string; } & { [key: string]: any; };

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export type FunctionReturnTypes<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never }[keyof T];

export {
    configureStore,
    createRootReducer,
};