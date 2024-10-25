import { createAction, props } from "@ngrx/store";

export const undo = createAction("[Form] Undo");

export const formValueChange = createAction("[Form] Value Change", props<any>());

export const redo = createAction("[Form] Redo");
