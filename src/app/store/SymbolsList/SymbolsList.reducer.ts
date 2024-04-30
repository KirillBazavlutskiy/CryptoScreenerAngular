import {createReducer, on} from "@ngrx/store";
import {ChangeSymbolPriceAction, DeleteSymbolAction, FetchSymbolsListSuccessAction} from "./SymbolsList.actions";
import {SolidityModel} from "../../models/RestApi/SolidityFinderModels.model";
import {
  BinanceOrdersCalculatingKit
} from "../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";

export const symbolsListReducer = createReducer<SolidityModel[]>(
  [],
  on(FetchSymbolsListSuccessAction, (state, { symbolsList }) => {
    return symbolsList;
  }),
  on(ChangeSymbolPriceAction, (state, { symbol, price }) => {
    const newSymbolsList: SolidityModel[] = JSON.parse(JSON.stringify(state));
    const binanceOrdersCalculationKit = new BinanceOrdersCalculatingKit();
    return newSymbolsList.map((solidityModel) => {
      if (solidityModel.Symbol === symbol) {
        solidityModel.Price = price;
        solidityModel.Solidity.UpToPrice = binanceOrdersCalculationKit.CalcSimplifiedRatio(price / solidityModel.Solidity.Price, solidityModel.Solidity.Type)
        return solidityModel
      } else {
        return solidityModel;
      }
    });
  }),
  on(DeleteSymbolAction, (state, { symbol }) => {
    const newSymbolsList: SolidityModel[] = JSON.parse(JSON.stringify(state));
    return newSymbolsList.filter((ticket) => ticket.Symbol !== symbol)
  })
)
