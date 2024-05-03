import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {selectedSymbolAction} from "../../../store/SelectedSymbol/SelectedSymbol.actions";
import {DeleteSymbolAction} from "../../../store/SymbolsList/SymbolsList.actions";
import {Observable} from "rxjs";
import {StylingOptionsModel} from "../../../models/Options/StylingOptions.model";
import {getLevelColor} from "../../../services/Styling/GetColorStyle";

@Component({
  selector: 'app-symbols-table-item',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: 'SymbolsTableItem.component.html'
})

export class SymbolsTableItemComponent implements OnChanges {
  @Input() solidityInfo!: SolidityModel;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;
  stylingOptions$: Observable<StylingOptionsModel>;

  getSolidityDistanceColor: (value: number) => string;
  getSolidityRatioColor: (value: number) => string;

  ClickHandler: () => void;

  constructor(
    private store: Store<StoreModel>,
  ) {
    this.getSolidityDistanceColor = (value: number) => "";
    this.getSolidityRatioColor = (value: number) => "";

    this.stylingOptions$ = this.store.select(store => store.stylingOptions);

    this.stylingOptions$.subscribe(newStylingOptions => {
      this.getSolidityDistanceColor = (value: number) => {
        if (this.solidityInfo.Solidity.Type === "asks") return getLevelColor(value, newStylingOptions.upToPrice.asks)
        else return getLevelColor(value, newStylingOptions.upToPrice.bids)
      }
      this.getSolidityRatioColor = (value: number) => getLevelColor(value, newStylingOptions.solidityRatio)
    })

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
}
