import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
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
  templateUrl: 'symbolsListItem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SymbolsListItemComponent {
  @Input() symbolTicket!: SolidityModel;
  @Input() getSolidityDistanceColor!: (solidityType: LimitType, value: number) => string;
  @Input() getSolidityRatioColor!: (value: number) => string;
  binanceOrdersCalculatingKit: BinanceOrdersCalculatingKit;
  activeSymbol$: Observable<SolidityModel | null>;

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
}
