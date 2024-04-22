import {createAction, props} from "@ngrx/store";
import {SolidityModel} from "../../models/RestApi/SolidityFinderModels.model";

export const selectedSymbolAction = createAction(
  '[ Selected Symbol ] SelectTheSymbol',
  props<{ solidityInfo: SolidityModel }>()
)
