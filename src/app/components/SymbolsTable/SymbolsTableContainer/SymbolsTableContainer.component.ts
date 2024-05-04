import {Component} from "@angular/core";
import {LimitType, SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {SymbolsTableItemComponent} from "../SymbolsTableItem/SymbolsTableItem.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SymbolsListItemComponent} from "../../SymbolsList/SymbolsListItem/symbolsListItem.component";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {StoreModel} from "../../../store/Store.model";
import {StylingOptionsModel} from "../../../models/Options/StylingOptions.model";
import {getLevelColor} from "../../../services/Styling/GetColorStyle";

@Component({
  selector: 'app-symbols-table-container',
  standalone: true,
  imports: [
    SymbolsTableItemComponent,
    NgForOf,
    SymbolsListItemComponent,
    AsyncPipe
  ],
  templateUrl: 'SymbolsTableContainer.component.html'
})

export class SymbolsTableContainerComponent {
  symbolsList$: Observable<SolidityModel[]>;
  stylingOptions$: Observable<StylingOptionsModel>;

  getSolidityDistanceColor: (solidityType: LimitType, value: number) => string;
  getSolidityRatioColor: (value: number) => string;

  constructor(private store: Store<StoreModel>) {
    this.symbolsList$ = store.select('symbolsList');

    this.getSolidityDistanceColor = (solidityType: LimitType, value: number) => "";
    this.getSolidityRatioColor = (value: number) => "";

    this.stylingOptions$ = this.store.select(store => store.stylingOptions);

    this.stylingOptions$.subscribe(newStylingOptions => {
      this.getSolidityDistanceColor = (solidityType: LimitType, value: number) => {
        if (solidityType === "asks") return getLevelColor(value, newStylingOptions.upToPrice.asks)
        else return getLevelColor(value, newStylingOptions.upToPrice.bids)
      }
      this.getSolidityRatioColor = (value: number) => getLevelColor(value, newStylingOptions.solidityRatio)
    })
  }
}
