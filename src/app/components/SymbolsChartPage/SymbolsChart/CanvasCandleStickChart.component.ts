import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {CategoryAxis, NumericAxis, NumericLabelProvider, OhlcDataSeries, SciChartSurface, XyDataSeries} from 'scichart';
import {TSciChart} from "scichart/types/TSciChart";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {
  cleanupSciChart,
  initEmptyCandlestickChart,
  refillCandleStickChart, updateCandlestickChart
} from "../../../services/Canvas/SciChart/SciChartCandlestickChart";
import {WebSocketKlineModel} from "../../../models/Websocket/Binance/StreamKlines";
import {CandleChartInterval, CandlestickBinanceData} from "../../../models/RestApi/Binance/Klines.model";



@Component({
  selector: 'app-canvas-candlestick-chart',
  template: '<div class="w-full h-full" [id]="canvasId"></div>',
  standalone: true,
})

export class CanvasCandleStickChartComponent implements OnDestroy, OnChanges, AfterViewInit {
  @Input() canvasId!: string;
  @Input() candlestickData!: CandlestickBinanceData[];
  @Input() solidityModel!: SolidityModel | null;
  @Input() chartTimeframe!: CandleChartInterval;
  @Input() streamLastCandle!: WebSocketKlineModel | null;
  @Input() tickSize!: number | null;

  symbolChanged: boolean = false;

  sciChartSurface!: SciChartSurface;

  candlestickSeries!: OhlcDataSeries;
  volumeSeries!: XyDataSeries;

  xAxis!: CategoryAxis;
  yAxis!: NumericAxis;

  wasmContext!: TSciChart;

  ngOnDestroy() {
    if (this.sciChartSurface) {
      cleanupSciChart(this.sciChartSurface);
    }
  }

  ngAfterViewInit() {
    if (this.canvasId) {
      initEmptyCandlestickChart(this.canvasId).then(res => {
        this.wasmContext = res.wasmContext
        this.sciChartSurface = res.sciChartSurface
        this.candlestickSeries = res.dataSeries.candlestickSeries;
        this.volumeSeries = res.dataSeries.volumeDataSeries;
        this.xAxis = res.axis.xAxis;
        this.yAxis = res.axis.yAxis;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.symbolChanged && this.tickSize) {
      if (
        this.sciChartSurface &&
        this.candlestickData.length !== 0 &&
        this.solidityModel &&
        this.chartTimeframe
      ) {
        refillCandleStickChart(
          this.candlestickData,
          this.sciChartSurface,
          this.candlestickSeries,
          this.volumeSeries,
          this.solidityModel,
          this.yAxis,
          this.tickSize
        )
      }
    }

    if (changes["streamLastCandle"] && this.streamLastCandle) {
      updateCandlestickChart(
        this.sciChartSurface,
        this.streamLastCandle,
        this.candlestickSeries,
        this.volumeSeries,
        this.yAxis
      )
    }

    this.symbolChanged = !!(changes["solidityModel"] || changes["chartTimeframe"]);
  }
}
