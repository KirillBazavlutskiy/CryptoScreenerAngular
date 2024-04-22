import {SolidityModel} from "../models/RestApi/SolidityFinderModels.model";

export interface StoreModel {
  symbolsList: SolidityModel[];
  symbolsListPageActive: boolean;
  selectedSymbol: SolidityModel | null;
}
