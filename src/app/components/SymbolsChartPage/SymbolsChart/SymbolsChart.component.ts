import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {Observable, switchMap, tap} from "rxjs";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderModels.model";
import {CandleChartInterval, CandlestickBinanceData} from "../../../models/RestApi/CandlestickData.model";
import {HttpClient} from "@angular/common/http";
import {CanvasCandleStickChartComponent} from "./CanvasCandleStickChart.component";
import {AsyncPipe} from "@angular/common";
import {WebSocketKlinesService} from "../../../services/WebSocket/WebSocketKlines.service";
import {
  CandlestickWebSocketModel,
  WebSocketKlineModel,
  WebSocketKlinesMessage
} from "../../../models/Websocket/BinanceStreamKlines";

@Component({
  selector: 'app-symbols-chart',
  templateUrl: 'SymbolsChart.component.html',
  standalone: true,
  imports: [
    CanvasCandleStickChartComponent,
    AsyncPipe
  ],
  providers: [
    WebSocketKlinesService,
    { provide: 'WS_URL', useValue: 'wss://fstream.binance.com/ws/' }
  ]
})

export class SymbolsChartComponent implements OnInit {
  @Input() canvasId!: string;
  @Input() candleChartInterval!: CandleChartInterval;

  SelectedSymbol$: Observable<SolidityModel | null>;
  CandlestickData: CandlestickBinanceData[] = [];
  LastCandlestick: WebSocketKlineModel | null = null;

  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private store: Store<StoreModel>,
    private httpClient: HttpClient,
    private webSocketKlinesService: WebSocketKlinesService<WebSocketKlinesMessage>
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
              `https://api.binance.com/api/v3/klines?symbol=${selectedSymbol.Symbol.toUpperCase()}&interval=${this.candleChartInterval}&limit=1500`,
            );
        } else {
          return [];
        }
      })
    ).subscribe(
      (data: CandlestickBinanceData[]) => {
        this.CandlestickData = data;
        const lastCandle = data[data.length - 1];
        this.LastCandlestick = {
          startTime: lastCandle[0],
          open: lastCandle[1],
          high: lastCandle[2],
          low: lastCandle[3],
          close: lastCandle[4],
          volume: lastCandle[5]
        }
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );

    this.SelectedSymbol$.subscribe(selectedSymbol => {
      if (selectedSymbol) {
        this.webSocketKlinesService.close();
        this.webSocketKlinesService.setNewUrl(`${selectedSymbol.Symbol.toLowerCase()}@kline_${this.candleChartInterval}`)

        this.webSocketKlinesService.receiveMessage().subscribe(
          (message: WebSocketKlinesMessage) => {
            if (message && message.k) {
              this.LastCandlestick = {
                startTime: message.k.t,
                open: message.k.o,
                high: message.k.h,
                low: message.k.l,
                close: message.k.c,
                volume: message.k.v,
              };
            }
          },
          (error: any) => {
            console.error('WebSocket error:', error);
          }
        );
      }
    })
  }
}
