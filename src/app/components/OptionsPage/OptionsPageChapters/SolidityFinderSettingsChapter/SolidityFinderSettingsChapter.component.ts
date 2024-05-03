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
    MinVolume: 10,
    RatioAccess: 15,
    UpToPriceAccess: 5,
    NonConcernPeriodAccess: 4
  }

  ChangeSolidityFinderOptionsValue(key: keyof SolidityFinderOptionsModel, value: number) {
    this.SolidityFinderOptions[key] = value;
  }

  ChangeMinVolumeValue = (value: number) => this.ChangeSolidityFinderOptionsValue("MinVolume", value);
  ChangeRatioAccessValue = (value: number) => this.ChangeSolidityFinderOptionsValue("RatioAccess", value);
  ChangeUpToPriceAccessValue = (value: number) => this.ChangeSolidityFinderOptionsValue("UpToPriceAccess", value);
  ChangeNonConcernPeriodAccessValue = (value: number) => this.ChangeSolidityFinderOptionsValue("NonConcernPeriodAccess", value);

  HandleClickApplyButton = () => {
    this.store.dispatch(FetchSymbolsListAction({ solidityFinderOptions: JSON.parse(JSON.stringify(this.SolidityFinderOptions)) }))
    this.store.dispatch(switchOptionsPageAction({ pageState: false }))
  }
}
