import {createAction, props} from "@ngrx/store";
import {SolidityModel} from "../../models/SolidityFinderModels.model";

export const selectedSymbolAction = createAction(
  '[ Selected Symbol ] SelectTheSymbol',
  props<{ solidityInfo: SolidityModel }>()
)
