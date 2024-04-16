import {SolidityModel} from "../models/SolidityFinderModels.model";

export interface StoreModel {
  symbolsList: SolidityModel[];
  symbolsListPageActive: boolean;
  selectedSymbol: SolidityModel | null;
}
