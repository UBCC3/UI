import { Action, createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/user.actions';
import { User } from '@auth0/auth0-angular';

export interface UserState {
    user: User | undefined;
}

const initialState: UserState = {
    user: undefined,
};

const reducer = createReducer<UserState>(
    initialState,
    on(setUser, (state, { user }) => {
        console.log('set user', user);
        return {
            ...state,
            user,
        };
    })
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
    return reducer(state, action);
}
