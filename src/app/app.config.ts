import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {StoreModel} from "./store/Store.model";
import {symbolsListReducer} from "./store/SymbolsListReducer/SymbolsList.reducer";
import {provideEffects} from "@ngrx/effects";
import {SymbolsListLoadEffect} from "./store/SymbolsListReducer/SymbolsList.effect";
import {activePageReducer} from "./store/ActivePageReducer/ActivePage.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore<StoreModel>({
      symbolsList: symbolsListReducer,
      symbolsListPageActive: activePageReducer
    }),
    provideEffects([
      SymbolsListLoadEffect
    ])
  ],
};
