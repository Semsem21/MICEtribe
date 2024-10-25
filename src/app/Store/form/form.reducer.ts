import { Action, createReducer, on } from "@ngrx/store";
import { formValueChange, redo, undo } from "./form.actions";

const initialHistoryState: any = {
	past: [],
	present: [],
	future: [],
};

const createFormReducer = createReducer(
	initialHistoryState,
	on(formValueChange, (state, { currentState }) => ({
		past: [...state.past, state.present],
		present: currentState,
		future: [],
	})),
	on(undo, (state) => {
		const previous = state.past[state.past.length - 1];
		const newPast = state.past.slice(0, state.past.length - 1);
		return {
			past: newPast,
			present: previous,
			future: [state.present, ...state.future],
		};
	}),
	on(redo, (state) => {
		const next = state.future[0];
		const newFuture = state.future.slice(1);
		return {
			past: [...state.past, state.present],
			present: next,
			future: newFuture,
		};
	})
);

export function formReducer(state: any, action: Action) {
	return createFormReducer(state, action);
}
