import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {LimitType, SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {selectedSymbolAction} from "../../../store/SelectedSymbol/SelectedSymbol.actions";
import {Observable} from "rxjs";
import {getLevelColor} from "../../../services/Styling/GetColorStyle";

@Component({
  selector: 'app-symbol-item',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: 'SymbolsListItem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SymbolsListItemComponent implements OnChanges {
  @Input() symbolTicket!: SolidityModel;
  @Input() getSolidityDistanceColor!: (solidityType: LimitType, value: number) => string;
  @Input() getSolidityRatioColor!: (value: number) => string;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;
  activeSymbol$: Observable<SolidityModel | null>;
  isSolidityBroken: boolean = false;

  ClickHandler: () => void;

  constructor(
    private store: Store<StoreModel>
  ) {
    this.ClickHandler = () => {
      this.store.dispatch(selectedSymbolAction({ solidityInfo: this.symbolTicket }))
    }
    this.activeSymbol$ = this.store.select("selectedSymbol")

    this.binanceOrdersCalculatingKit = new BinanceOrdersCalculatingKit();
  }
  protected readonly getLevelColor = getLevelColor;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isSolidityBroken && this.symbolTicket.Solidity.UpToPrice < 0) {
      this.isSolidityBroken = true;
    }
  }
}
