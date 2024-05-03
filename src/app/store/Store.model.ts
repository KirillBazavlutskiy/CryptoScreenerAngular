import {SolidityModel} from "../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {ActivePagesModel} from "./ActivePage/ActivePages.model";
import {StylingOptionsModel} from "../models/Options/StylingOptions.model";

export interface StoreModel {
  symbolsList: SolidityModel[];
  activePages: ActivePagesModel;
  selectedSymbol: SolidityModel | null;
  stylingOptions: StylingOptionsModel;
}
