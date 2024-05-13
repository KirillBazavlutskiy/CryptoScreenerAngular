import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LimitType, SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {selectedSymbolAction} from "../../../store/SelectedSymbol/SelectedSymbol.actions";
import {DeleteSymbolAction} from "../../../store/SymbolsList/SymbolsList.actions";

@Component({
  selector: 'app-symbols-table-item',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: 'SymbolsTableItem.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})

export class SymbolsTableItemComponent implements OnChanges {
  @Input() solidityInfo!: SolidityModel;
  @Input() getSolidityDistanceColor!: (solidityType: LimitType, value: number) => string;
  @Input() getSolidityRatioColor!: (value: number) => string;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;
  isSolidityBroken: boolean = false;

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
    if (!this.isSolidityBroken && this.solidityInfo.Solidity.UpToPrice < 0) {
      this.isSolidityBroken = true;
    }
  }
}
