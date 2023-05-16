import { ActionReducerMap } from "@ngrx/store";
import { SharedState, sharedReducer } from "./shared/shared.reducer";
import { AuthState, authReducer } from "./auth/auth.reducer";

export interface AppState {
    sharedInfo: SharedState;
    authInfo: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    sharedInfo: sharedReducer,
    authInfo: authReducer
}