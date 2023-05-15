import { ActionReducerMap } from "@ngrx/store";
import { SharedState, sharedReducer } from "./shared/shared.reducer";

export interface AppState {
    sharedInfo: SharedState;
}

export const appReducer: ActionReducerMap<AppState> = {
    sharedInfo: sharedReducer
}