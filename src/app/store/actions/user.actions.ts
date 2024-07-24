import { createAction, props } from '@ngrx/store';
import { User } from '@auth0/auth0-angular';

export const setUser = createAction('[User] set user', props<{ user: User }>());
export const userAuthenticated = createAction('[User] Authenticated');

export const loginFlowInitiated = createAction('[Navbar] Login Flow Initiated');
export const logoutFlowInitiated = createAction('[Navbar] Logout Flow Initiated');
export const signupFlowInitiated = createAction('[Navbar] Signup Flow Initiated');
