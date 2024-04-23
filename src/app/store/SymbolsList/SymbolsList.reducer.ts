import {createReducer, on} from "@ngrx/store";
import {ChangeSymbolPriceAction, FetchSymbolsListSuccessAction} from "./SymbolsList.actions";
import {SolidityModel} from "../../models/RestApi/SolidityFinderModels.model";

export const symbolsListReducer = createReducer<SolidityModel[]>(
  [],
  on(FetchSymbolsListSuccessAction, (state, { symbolsList }) => {
    return symbolsList;
  }),
  on(ChangeSymbolPriceAction, (state, { symbol, price }) => {
    const newSymbolsList: SolidityModel[] = JSON.parse(JSON.stringify(state));
    return newSymbolsList.map((solidityModel) => {
      if (solidityModel.Symbol === symbol) {
        solidityModel.Price = price;
        return solidityModel
      } else {
        return solidityModel;
      }
    });
  })
)
