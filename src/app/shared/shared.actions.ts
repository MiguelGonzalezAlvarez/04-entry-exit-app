import { createAction, props } from "@ngrx/store";

export const updateLoading = createAction('[UI Component] isLoading change', props<{ loading: boolean }>());
export const resetLoading = createAction('[Todo Component] Reset isLoding');