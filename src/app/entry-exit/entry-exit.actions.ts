import { createAction, props } from "@ngrx/store";
import { EntryExit } from "../models/entry-exit.model";

export const updateItems = createAction('[EntryExit Component] Items change', props<{ updatedItems: EntryExit[] }>());
export const resetItems = createAction('[EntryExit Component] Reset items');