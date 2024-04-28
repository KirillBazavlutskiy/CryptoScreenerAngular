import {SolidityModel} from "../models/RestApi/SolidityFinderModels.model";
import {ActivePagesModel} from "./ActivePage/ActivePages.model";

export interface StoreModel {
  symbolsList: SolidityModel[];
  activePages: ActivePagesModel;
  selectedSymbol: SolidityModel | null;
}
