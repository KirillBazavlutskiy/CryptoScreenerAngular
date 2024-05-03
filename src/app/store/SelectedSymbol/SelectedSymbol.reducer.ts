import {createReducer, on} from "@ngrx/store";
import {SolidityModel} from "../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {selectedSymbolAction} from "./SelectedSymbol.actions";

export const selectedSymbolReducer = createReducer<SolidityModel | null>(
  null,
  on(selectedSymbolAction, (state, { solidityInfo }) => solidityInfo)
)
