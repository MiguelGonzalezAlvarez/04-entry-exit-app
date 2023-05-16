import { createAction, props } from "@ngrx/store";
import { User } from "firebase/auth";

export const updateUser = createAction('[Auth Component] User change', props<{ currentUser: User }>());
export const resetUser = createAction('[Auth Component] Reset user');