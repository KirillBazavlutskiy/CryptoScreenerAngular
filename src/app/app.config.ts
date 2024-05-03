import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {StoreModel} from "./store/Store.model";
import {symbolsListReducer} from "./store/SymbolsList/SymbolsList.reducer";
import {provideEffects} from "@ngrx/effects";
import {SymbolsListLoadEffect} from "./store/SymbolsList/SymbolsList.effect";
import {activePagesReducer} from "./store/ActivePage/ActivePages.reducer";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {selectedSymbolReducer} from "./store/SelectedSymbol/SelectedSymbol.reducer";
import {SelectedSymbolEffect} from "./store/SelectedSymbol/SelectedSymbol.effect";
import {stylingOptionsReducer} from "./store/StylingOptions/StylingOptions.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore<StoreModel>({
      symbolsList: symbolsListReducer,
      activePages: activePagesReducer,
      selectedSymbol: selectedSymbolReducer,
      stylingOptions: stylingOptionsReducer
    }),
    provideEffects([
      SymbolsListLoadEffect,
      SelectedSymbolEffect
    ])
  ],
};
