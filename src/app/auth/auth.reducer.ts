import { createReducer, on } from "@ngrx/store";
import { updateUser, resetUser } from "./auth.actions";

import { User } from "firebase/auth";

export interface AuthState {
    user: User | null;
}

export const initialState: AuthState = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(updateUser, (state, { currentUser }) => ({ ...state, user: { ...currentUser } })),
    on(resetUser, () => initialState)
);