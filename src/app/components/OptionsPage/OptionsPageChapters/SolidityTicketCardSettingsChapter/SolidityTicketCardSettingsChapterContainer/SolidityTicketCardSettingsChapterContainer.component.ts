import {Component} from "@angular/core";
import {StoreModel} from "../../../../../store/Store.model";
import {Store} from "@ngrx/store";
import {StylingOptionsModel} from "../../../../../models/Options/StylingOptions.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {OptionsInputComponent} from "../../../OptionsUI/OptionsInput/OptionsInput.component";
import {setStylingOptions} from "../../../../../store/StylingOptions/StylingOptions.action";
import {OptionsButtonComponent} from "../../../OptionsUI/OptionsButton/OptionsButton.component";
import {
  StylingBreakpointsContainerComponent
} from "../StylingBreakpointsContainer/StylingBreakpointsContainer.component";
import {
  CreateNewPaintBreakpointButtonComponent
} from "../CreateNewPaintBreakpointButton/CreateNewPaintBreakpointButton.component";

@Component({
  selector: "app-solidity-ticket-card-chapter-settings",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    OptionsInputComponent,
    OptionsButtonComponent,
    StylingBreakpointsContainerComponent,
    CreateNewPaintBreakpointButtonComponent
  ],
  templateUrl: "SolidityTicketCardSettingsChapterContainer.component.html"
})

export class SolidityTicketCardSettingsChapterContainerComponent {
  stylingOptions: StylingOptionsModel | null;
  setNewStylingOptionsCLickHandler: () => void;

  constructor(
    private store: Store<StoreModel>
  ) {
    this.stylingOptions = null;
    this.store.select(store => store.stylingOptions)
      .subscribe(newOptions => this.stylingOptions = JSON.parse(JSON.stringify(newOptions)))
    this.setNewStylingOptionsCLickHandler = () => {
      if (this.stylingOptions) {
        this.store.dispatch(setStylingOptions({ stylingOptions: this.stylingOptions }))
        alert("Applied!")
      }
    }
  }
}
