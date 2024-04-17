import {Component, Input} from "@angular/core";
import {SolidityModel} from "../../../models/SolidityFinderModels.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {NgClass} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {selectedSymbolAction} from "../../../store/SelectedSymbol/SelectedSymbol.actions";

@Component({
  selector: 'app-symbol-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: 'symbolsListItem.component.html'
})

export class SymbolsListItemComponent {
  @Input() symbolTicket!: SolidityModel;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;

  ClickHandler: () => void;
  constructor(
    private store: Store<StoreModel>
  ) {
    this.ClickHandler = () => {
      this.store.dispatch(selectedSymbolAction({ solidityInfo: this.symbolTicket }))
    }

    this.binanceOrdersCalculatingKit = new BinanceOrdersCalculatingKit();
  }
}