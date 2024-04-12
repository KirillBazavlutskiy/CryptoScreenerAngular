import {createReducer, on} from "@ngrx/store";
import {switchActivePageAction} from "./ActivePage.actions";

export const activePageReducer = createReducer<boolean>(
  false,
  on(switchActivePageAction, state => !state)
);
