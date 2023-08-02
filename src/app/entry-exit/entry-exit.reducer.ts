import { createReducer, on } from "@ngrx/store";
import { EntryExit } from "../models/entry-exit.model";
import { updateItems, resetItems } from "./entry-exit.actions";

export interface EntryExitState {
    items: EntryExit[];
}

export const initialState: EntryExitState = {
    items: []
};

export const entryExitReducer = createReducer(
    initialState,
    on(updateItems, (state, { updatedItems }) => ({ ...state, items: [...updatedItems] })),
    on(resetItems, () => initialState)
);