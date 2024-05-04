import {Component} from "@angular/core";
import {SymbolsListItemComponent} from "../SymbolsListItem/symbolsListItem.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {LimitType, SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import {StoreModel} from "../../../store/Store.model";
import {StylingOptionsModel} from "../../../models/Options/StylingOptions.model";
import {getLevelColor} from "../../../services/Styling/GetColorStyle";

@Component({
  selector: 'app-symbols-item-list',
  standalone: true,
  imports: [
    SymbolsListItemComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: 'symbolsListContainer.component.html'
})

export class SymbolsListContainerComponent {

  symbolsList$: Observable<SolidityModel[]>;
  stylingOptions$: Observable<StylingOptionsModel>;

  getSolidityDistanceColor: (solidityType: LimitType, value: number) => string;
  getSolidityRatioColor: (value: number) => string;

  constructor(private store: Store<StoreModel>) {
    this.symbolsList$ = store.select('symbolsList')

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
