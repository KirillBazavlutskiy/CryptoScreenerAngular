import {createAction, props} from "@ngrx/store";
import {SolidityModel} from "../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {SolidityFinderOptionsModel} from "../../models/Options/SolidityFinderOptions.model";

export const FetchSymbolsListAction = createAction(
  '[ SymbolsList ] Fetch Symbols',
  props<{ solidityFinderOptions?: SolidityFinderOptionsModel }>()
);

export const FetchSymbolsListSuccessAction = createAction(
  '[ SymbolsList ] Fetch Symbols Success',
  props<{ symbolsList: SolidityModel[] }>()
);

export const ChangeSymbolPriceAction = createAction(
  '[ SymbolsList ] Change Symbols List',
  props<{ symbol: string, price: number }>()
)

export const DeleteSymbolAction = createAction(
  '[ SymbolsList ] Delete Symbol',
  props<{ symbol: string }>()
)
