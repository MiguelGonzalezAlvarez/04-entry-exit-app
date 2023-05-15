import { ActionReducerMap } from "@ngrx/store";
import { SharedState, sharedReducer } from "./shared/shared.redicer";

export interface AppState {
    sharedInfo: SharedState;
}

export const appReducer: ActionReducerMap<AppState> = {
    sharedInfo: sharedReducer
}