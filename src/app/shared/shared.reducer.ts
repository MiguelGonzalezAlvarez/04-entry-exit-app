import { createReducer, on } from "@ngrx/store";
import { updateLoading, resetLoading } from "./shared.actions";

export interface SharedState {
    isLoading: boolean;
}

export const initialState: SharedState = {
    isLoading: false
};

export const sharedReducer = createReducer(
    initialState,
    on(updateLoading, (state, { loading }) => ({ ...state, isLoading: loading })),
    on(resetLoading, () => initialState)
);