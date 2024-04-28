import {Component} from "@angular/core";
import {LabelComponentComponent} from "../../OptionsUI/LabelComponent/LabelComponent.component";
import {SolidityFinderOptionsModel} from "../../../../models/Options/SolidityFinderOptions.model";
import {StoreModel} from "../../../../store/Store.model";
import {Store} from "@ngrx/store";
import {FetchSymbolsListAction} from "../../../../store/SymbolsList/SymbolsList.actions";
import {switchOptionsPageAction} from "../../../../store/ActivePage/ActivePages.actions";

@Component({
  selector: 'app-options-solidity-finder-chapter',
  standalone: true,
  imports: [
    LabelComponentComponent
  ],
  templateUrl: 'SolidityFinderSettingsChapter.component.html'
})

export class SolidityFinderSettingsChapterComponent {
  constructor(
    private store: Store<StoreModel>
  ) {
  }

  SolidityFinderOptions: SolidityFinderOptionsModel  = {
    SolidityFinderMinVolume: 1000000,
    SolidityFinderRatioAccess: 20,
    SolidityFinderUpToPriceAccess: 5,
  }

  ChangeSolidityFinderOptionsValue(key: keyof SolidityFinderOptionsModel, value: number) {
    this.SolidityFinderOptions[key] = value;
  }

  ChangeMinVolumeValue = (value: number) => this.ChangeSolidityFinderOptionsValue("SolidityFinderMinVolume", value);
  ChangeRatioAccessValue = (value: number) => this.ChangeSolidityFinderOptionsValue("SolidityFinderRatioAccess", value);
  ChangeUpToPriceAccessValue = (value: number) => this.ChangeSolidityFinderOptionsValue("SolidityFinderUpToPriceAccess", value);

  HandleClickApplyButton = () => {
    this.store.dispatch(FetchSymbolsListAction({ solidityFinderOptions: JSON.parse(JSON.stringify(this.SolidityFinderOptions)) }))
    this.store.dispatch(switchOptionsPageAction({ pageState: false }))
  }
}
