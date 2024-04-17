import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {StoreModel} from "./store/Store.model";
import {symbolsListReducer} from "./store/SymbolsList/SymbolsList.reducer";
import {provideEffects} from "@ngrx/effects";
import {SymbolsListLoadEffect} from "./store/SymbolsList/SymbolsList.effect";
import {activePageReducer} from "./store/ActivePage/ActivePage.reducer";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {selectedSymbolReducer} from "./store/SelectedSymbol/SelectedSymbol.reducer";
import {SelectedSymbolEffect} from "./store/SelectedSymbol/SelectedSymbol.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore<StoreModel>({
      symbolsList: symbolsListReducer,
      symbolsListPageActive: activePageReducer,
      selectedSymbol: selectedSymbolReducer
    }),
    provideEffects([
      SymbolsListLoadEffect,
      SelectedSymbolEffect
    ])
  ],
};
