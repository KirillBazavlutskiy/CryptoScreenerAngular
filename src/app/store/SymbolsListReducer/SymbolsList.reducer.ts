import {createReducer, on} from "@ngrx/store";
import {FetchSymbolsListSuccessAction} from "./SymbolsList.actions";
import {SolidityModel} from "../../models/SolidityFinderModels.model";

export const symbolsListReducer = createReducer<SolidityModel[]>(
  [],
  on(FetchSymbolsListSuccessAction, (state, { symbolsList }) => {
    return symbolsList;
  })
)
