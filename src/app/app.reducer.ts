import { ActionReducerMap } from "@ngrx/store";
import { SharedState, sharedReducer } from "./shared/shared.reducer";
import { AuthState, authReducer } from "./auth/auth.reducer";
import { EntryExitState, entryExitReducer } from "./entry-exit/entry-exit.reducer";

export interface AppState {
    sharedInfo: SharedState;
    authInfo: AuthState;
    entryExitInfo: EntryExitState;
}

export const appReducer: ActionReducerMap<AppState> = {
    sharedInfo: sharedReducer,
    authInfo: authReducer,
    entryExitInfo: entryExitReducer
}