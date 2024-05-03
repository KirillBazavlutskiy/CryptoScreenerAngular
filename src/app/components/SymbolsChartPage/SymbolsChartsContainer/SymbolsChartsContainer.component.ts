import {Component} from "@angular/core";
import {SymbolsChartComponent} from "../SymbolsChart/SymbolsChart.component";
import {HttpClient} from "@angular/common/http";
import {ExchangeInfoModel, ExchangeInfoSymbol} from "../../../models/RestApi/Binance/ExchangeInfo.model";
import {StoreModel} from "../../../store/Store.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";

@Component({
  selector: 'app-symbols-charts',
  templateUrl: 'SymbolsChartsContainer.component.html',
  imports: [
    SymbolsChartComponent
  ],
  standalone: true
})

export class SymbolsChartsContainerComponent {
  CanvasChartId1: string = "";
  CanvasChartId2: string = "";
  CanvasChartId3: string = "";

  exchangeInfo: ExchangeInfoModel | null;
  exchangeInfoSymbol: ExchangeInfoSymbol | null;
  selectedSymbol: SolidityModel | null;

  constructor(
    private httpClient: HttpClient,
    private store: Store<StoreModel>
  ) {
    this.CanvasChartId1 = "canvas1";
    this.CanvasChartId2 = "canvas2";
    this.CanvasChartId3 = "canvas3";

    this.exchangeInfo = null;
    this.exchangeInfoSymbol = null;
    this.selectedSymbol = null;
    this.store.select(store => store.selectedSymbol)
      .subscribe(selectedSymbolObservable => {
        this.selectedSymbol = selectedSymbolObservable
        if (this.exchangeInfo && selectedSymbolObservable) {
          this.exchangeInfo.symbols.forEach(exchangeInfoSymbol => {
            if (exchangeInfoSymbol.symbol === selectedSymbolObservable.Symbol) {
              this.exchangeInfoSymbol = exchangeInfoSymbol;
            }
          })
        }
      });
    this.httpClient.get<ExchangeInfoModel>('https://api.binance.com/api/v3/exchangeInfo')
      .subscribe(exchangeInfoData => this.exchangeInfo = exchangeInfoData)
  }
}
