import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderModels.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {NgClass} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {selectedSymbolAction} from "../../../store/SelectedSymbol/SelectedSymbol.actions";
import {getSolidityDistanceColor} from "../../../services/Styling/GetColorStyle";
import {DeleteSymbolAction} from "../../../store/SymbolsList/SymbolsList.actions";

@Component({
  selector: 'app-symbols-table-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: 'SymbolsTableItem.component.html'
})

export class SymbolsTableItemComponent implements OnChanges {
  @Input() solidityInfo!: SolidityModel;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;

  ClickHandler: () => void;

  constructor(
    private store: Store<StoreModel>,
  ) {
    this.binanceOrdersCalculatingKit = new BinanceOrdersCalculatingKit();
    this.ClickHandler = () => {
      this.store.dispatch(selectedSymbolAction({ solidityInfo: this.solidityInfo }));
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.solidityInfo.Solidity.UpToPrice < 0) {
      this.store.dispatch(DeleteSymbolAction({ symbol: this.solidityInfo.Symbol }))
    }
  }

  protected readonly getSolidityDistanceColor = getSolidityDistanceColor;
}
