import {Component, Input} from "@angular/core";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {selectedSymbolAction} from "../../../store/SelectedSymbol/SelectedSymbol.actions";
import {Observable} from "rxjs";
import {StylingOptionsModel} from "../../../models/Options/StylingOptions.model";
import {getLevelColor} from "../../../services/Styling/GetColorStyle";

@Component({
  selector: 'app-symbol-item',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: 'symbolsListItem.component.html'
})

export class SymbolsListItemComponent {
  @Input() symbolTicket!: SolidityModel;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;
  activeSymbol$: Observable<SolidityModel | null>;
  stylingOptions$: Observable<StylingOptionsModel>;

  getSolidityDistanceColor: (value: number) => string;
  getSolidityRatioColor: (value: number) => string;

  ClickHandler: () => void;

  constructor(
    private store: Store<StoreModel>
  ) {
    this.ClickHandler = () => {
      this.store.dispatch(selectedSymbolAction({ solidityInfo: this.symbolTicket }))
    }
    this.getSolidityDistanceColor = (value: number) => "";
    this.getSolidityRatioColor = (value: number) => "";

    this.stylingOptions$ = this.store.select(store => store.stylingOptions);
    this.activeSymbol$ = this.store.select("selectedSymbol")

    this.binanceOrdersCalculatingKit = new BinanceOrdersCalculatingKit();

    this.stylingOptions$.subscribe(newStylingOptions => {
      this.getSolidityDistanceColor = (value: number) => {
        if (this.symbolTicket.Solidity.Type === "asks") return getLevelColor(value, newStylingOptions.upToPrice.asks)
        else return getLevelColor(value, newStylingOptions.upToPrice.bids)
      }
      this.getSolidityRatioColor = (value: number) => getLevelColor(value, newStylingOptions.solidityRatio)
    })
  }
  protected readonly getLevelColor = getLevelColor;
}
