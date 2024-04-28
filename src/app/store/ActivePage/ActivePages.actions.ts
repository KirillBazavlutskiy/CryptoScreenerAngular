import {createAction, props} from "@ngrx/store";

export const switchActiveMainPageAction = createAction(
  '[ ActivePage ] Switch Active Page',
  props<{ pageState?: boolean }>()
);

export const switchOptionsPageAction = createAction(
  '[ ActivePage ] Switch Options Page',
  props<{ pageState?: boolean }>()
)
