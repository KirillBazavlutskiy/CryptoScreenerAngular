import {Component} from "@angular/core";
import {LabelComponentComponent} from "../../OptionsUI/LabelComponent/LabelComponent.component";
import {SolidityFinderOptionsModel} from "../../../../models/Options/SolidityFinderOptions.model";
import {StoreModel} from "../../../../store/Store.model";
import {Store} from "@ngrx/store";
import {FetchSymbolsListAction} from "../../../../store/SymbolsList/SymbolsList.actions";
import {switchOptionsPageAction} from "../../../../store/ActivePage/ActivePages.actions";
import {OptionsButtonComponent} from "../../OptionsUI/OptionsButton/OptionsButton.component";

@Component({
  selector: 'app-options-solidity-finder-chapter',
  standalone: true,
  imports: [
    LabelComponentComponent,
    OptionsButtonComponent
  ],
  templateUrl: 'SolidityFinderSettingsChapter.component.html'
})

export class SolidityFinderSettingsChapterComponent {
  HandleClickApplyButton: () => void;

  constructor(
    private store: Store<StoreModel>
  ) {
    this.HandleClickApplyButton = () => {
      this.store.dispatch(FetchSymbolsListAction({ solidityFinderOptions: JSON.parse(JSON.stringify(this.SolidityFinderOptions)) }))
      alert("Applied!")
    }
  }

  SolidityFinderOptions: SolidityFinderOptionsModel  = {
    MinVolume: 10,
    RatioAccess: 10,
    UpToPriceAccess: 5,
    NonConcernPeriodAccess: 4
  }
}
