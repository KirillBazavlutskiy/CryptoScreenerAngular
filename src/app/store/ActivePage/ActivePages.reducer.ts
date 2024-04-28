import {createReducer, on} from "@ngrx/store";
import {switchActiveMainPageAction, switchOptionsPageAction} from "./ActivePages.actions";
import {ActivePagesModel} from "./ActivePages.model";

export const activePagesReducer = createReducer<ActivePagesModel>(
  {
    mainPage: false,
    optionsPage: false,
  },
  on(switchActiveMainPageAction, (state, { pageState }) => {
    if (pageState !== undefined) {
      return {
        mainPage: pageState,
        optionsPage: state.optionsPage
      }
    } else {
      return {
        mainPage: !state.mainPage,
        optionsPage: state.optionsPage
      }
    }
  }),
  on(switchOptionsPageAction, (state, { pageState }) => {
    if (pageState !== undefined) {
      return {
        mainPage: state.mainPage,
        optionsPage: pageState
      }
    } else {
      return {
        mainPage: state.mainPage,
        optionsPage: !state.optionsPage
      }
    }
  })
);
