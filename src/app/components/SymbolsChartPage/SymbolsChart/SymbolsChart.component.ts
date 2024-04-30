import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {async, interval, Observable, switchMap, tap} from "rxjs";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderModels.model";
import {
  CandleChartInterval,
  candleIntervals,
  CandlestickBinanceData
} from "../../../models/RestApi/CandlestickData.model";
import {HttpClient} from "@angular/common/http";
import {CanvasCandleStickChartComponent} from "./CanvasCandleStickChart.component";
import {AsyncPipe} from "@angular/common";
import {WebSocketService} from "../../../services/WebSocket/WebSocket.service";
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
    WebSocketService,
    { provide: 'WS_URL', useValue: 'wss://fstream.binance.com/ws/' }
  ]
})

export class SymbolsChartComponent implements OnInit, OnChanges {
  @Input() canvasId!: string;
  @Input() candleChartInterval!: CandleChartInterval;

  otherChartIntervals: CandleChartInterval[] = [];

  selectedSymbol$: Observable<SolidityModel | null>;

  lastSelectedSymbol: SolidityModel | null;

  CandlestickData: CandlestickBinanceData[] = [];
  LastCandlestick: WebSocketKlineModel | null = null;

  isLoading: boolean = false;
  error: string | null = null;

  async loadCandlestickData(selectedSymbol: SolidityModel | null) {
    this.webSocketKlinesService.close();
    if (this.CandlestickData.length !== 0) this.isLoading = true;

    try {
      this.lastSelectedSymbol = selectedSymbol;

      if (this.lastSelectedSymbol) {
        this.CandlestickData = await this.httpClient
          .get<CandlestickBinanceData[]>(
            `https://api.binance.com/api/v3/klines?symbol=${this.lastSelectedSymbol.Symbol.toUpperCase()}&interval=${this.candleChartInterval}&limit=1500`,
          ).toPromise() || [];
      } else {
        this.CandlestickData = []
      }

      const lastCandle = this.CandlestickData[this.CandlestickData.length - 1];
      this.LastCandlestick = {
        startTime: lastCandle[0],
        open: lastCandle[1],
        high: lastCandle[2],
        low: lastCandle[3],
        close: lastCandle[4],
        volume: lastCandle[5]
      }

      this.isLoading = false;

      if (this.lastSelectedSymbol) {
        this.webSocketKlinesService.setNewUrl(`${this.lastSelectedSymbol.Symbol.toLowerCase()}@kline_${this.candleChartInterval}`)
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

    } catch (error: any) {
      this.error = error.message;
      this.isLoading = false;
    }
  }

  constructor(
    private store: Store<StoreModel>,
    private httpClient: HttpClient,
    private webSocketKlinesService: WebSocketService<WebSocketKlinesMessage>
  ) {
    this.selectedSymbol$ = store.select('selectedSymbol');
    this.lastSelectedSymbol = null;
  }

  ngOnInit(): void {
    this.selectedSymbol$ = this.store.select('selectedSymbol');

    this.selectedSymbol$.subscribe(async (selectedSymbol) => {
      await this.loadCandlestickData(selectedSymbol)
    })

    // this.SelectedSymbol$.pipe(
    //   tap(() => {
    //     if (this.CandlestickData.length !== 0) this.isLoading = true;
    //   }),
    //   switchMap(selectedSymbol => {
    //     if (selectedSymbol) {
    //       return this.httpClient
    //         .get<CandlestickBinanceData[]>(
    //           `https://api.binance.com/api/v3/klines?symbol=${selectedSymbol.Symbol.toUpperCase()}&interval=${this.candleChartInterval}&limit=1500`,
    //         );
    //     } else {
    //       return [];
    //     }
    //   })
    // ).subscribe(
    //   (data: CandlestickBinanceData[]) => {
    //     this.CandlestickData = data;
    //     const lastCandle = data[data.length - 1];
    //     this.LastCandlestick = {
    //       startTime: lastCandle[0],
    //       open: lastCandle[1],
    //       high: lastCandle[2],
    //       low: lastCandle[3],
    //       close: lastCandle[4],
    //       volume: lastCandle[5]
    //     }
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.error = error;
    //     this.isLoading = false;
    //   }
    // );
    //
    // this.SelectedSymbol$.subscribe(selectedSymbol => {
    //   if (selectedSymbol) {
    //     this.webSocketKlinesService.close();
    //     this.webSocketKlinesService.setNewUrl(`${selectedSymbol.Symbol.toLowerCase()}@kline_${this.candleChartInterval}`)
    //
    //     this.webSocketKlinesService.receiveMessage().subscribe(
    //       (message: WebSocketKlinesMessage) => {
    //         if (message && message.k) {
    //           this.LastCandlestick = {
    //             startTime: message.k.t,
    //             open: message.k.o,
    //             high: message.k.h,
    //             low: message.k.l,
    //             close: message.k.c,
    //             volume: message.k.v,
    //           };
    //         }
    //       },
    //       (error: any) => {
    //         console.error('WebSocket error:', error);
    //       }
    //     );
    //   }
    // })
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ((changes['candleChartInterval'].previousValue !== changes['candleChartInterval'].currentValue)) {
      this.otherChartIntervals = candleIntervals.filter(chartInterval => chartInterval !== this.candleChartInterval);
    }
  }

  async ChangeTimeframe(newCandlestickTimeframe: CandleChartInterval) {
    this.candleChartInterval = newCandlestickTimeframe;
    this.otherChartIntervals = candleIntervals.filter(chartInterval => chartInterval !== this.candleChartInterval);
    await this.loadCandlestickData(this.lastSelectedSymbol)
  }


  protected readonly candleIntervals = candleIntervals;
}
