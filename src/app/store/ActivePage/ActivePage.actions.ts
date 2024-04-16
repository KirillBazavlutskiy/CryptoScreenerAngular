import {createAction, props} from "@ngrx/store";

export const switchActivePageAction = createAction(
  '[ ActivePage ] Switch Active Page',
  props<{ pageState?: boolean }>()
);
