import {SolidityModel} from "../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {ActivePagesModel} from "./ActivePage/ActivePages.model";

export interface StoreModel {
  symbolsList: SolidityModel[];
  activePages: ActivePagesModel;
  selectedSymbol: SolidityModel | null;
}
