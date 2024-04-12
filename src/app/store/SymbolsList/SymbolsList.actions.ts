import {createAction, props} from "@ngrx/store";
import {SolidityModel} from "../../models/SolidityFinderModels.model";

export const FetchSymbolsListAction = createAction('[ SymbolsList ] Fetch Symbols');

export const FetchSymbolsListSuccessAction = createAction(
  '[ SymbolsList ] Fetch Symbols Success',
  props<{ symbolsList: SolidityModel[] }>()
);

