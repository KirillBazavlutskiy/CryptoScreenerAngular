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
  selector: 'app-symbols-table-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: 'SymbolsTableItem.component.html'
})

export class SymbolsTableItemComponent {
  @Input() solidityInfo!: SolidityModel;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;

  ClickHandler: () => void;

  constructor(
    private store: Store<StoreModel>
  ) {
    this.binanceOrdersCalculatingKit = new BinanceOrdersCalculatingKit();
    this.ClickHandler = () => {
      this.store.dispatch(selectedSymbolAction({ solidityInfo: this.solidityInfo }))
    }
  }
}
