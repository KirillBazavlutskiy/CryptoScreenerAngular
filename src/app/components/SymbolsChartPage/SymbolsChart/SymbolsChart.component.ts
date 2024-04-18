import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {async, Observable, switchMap, tap} from "rxjs";
import {SolidityModel} from "../../../models/SolidityFinderModels.model";
import {CandleChartInterval, CandlestickBinanceData} from "../../../models/CandlestickData.model";
import {HttpClient} from "@angular/common/http";
import {CanvasCandleStickChartComponent} from "./CanvasCandleStickChart.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-symbols-chart',
  templateUrl: 'SymbolsChart.component.html',
  standalone: true,
  imports: [
    CanvasCandleStickChartComponent,
    AsyncPipe
  ]
})

export class SymbolsChartComponent implements OnInit {
  @Input() canvasId!: string;
  @Input() candleChartInterval!: CandleChartInterval;

  SelectedSymbol$: Observable<SolidityModel | null>;
  CandlestickData: CandlestickBinanceData[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private store: Store<StoreModel>,
    private httpClient: HttpClient,
  ) {
    this.SelectedSymbol$ = store.select('selectedSymbol');
  }

  ngOnInit(): void {
    this.SelectedSymbol$ = this.store.select('selectedSymbol');

    this.SelectedSymbol$.pipe(
      tap(() => {
        if (this.CandlestickData.length !== 0) this.isLoading = true;
      }),
      switchMap(selectedSymbol => {
        if (selectedSymbol) {
          return this.httpClient
            .get<CandlestickBinanceData[]>(
              `https://cryptoscreenernodejsapi.onrender.com/api/GetKlines?symbol=${selectedSymbol.Symbol.toUpperCase()}&interval=${this.candleChartInterval}&limit=1500`
            );
        } else {
          return [];
        }
      })
    ).subscribe(
      (data: CandlestickBinanceData[]) => {
        this.CandlestickData = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }
}
