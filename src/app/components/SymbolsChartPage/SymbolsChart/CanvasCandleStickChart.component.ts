import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {CategoryAxis, NumericAxis, OhlcDataSeries, SciChartSurface, XyDataSeries} from 'scichart';
import {CandleChartInterval, CandlestickBinanceData} from "../../../models/RestApi/CandlestickData.model";
import {TSciChart} from "scichart/types/TSciChart";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderModels.model";
import {
  cleanupSciChart,
  initEmptyCandlestickChart,
  refillCandleStickChart, updateCandlestickChart
} from "../../../services/Canvas/SciChart/SciChartCandlestickChart";
import {WebSocketKlineModel} from "../../../models/Websocket/BinanceStreamKlines";



@Component({
  selector: 'app-canvas-candlestick-chart',
  template: '<div class="w-full h-full" [id]="canvasId"></div>',
  standalone: true,
})

export class CanvasCandleStickChartComponent implements OnDestroy, OnChanges, AfterViewInit {
  @Input() canvasId!: string;
  @Input() CandlestickData!: CandlestickBinanceData[];
  @Input() SolidityModel!: SolidityModel | null;
  @Input() ChartTimeframe!: CandleChartInterval;
  @Input() StreamLastCandle!: WebSocketKlineModel | null;

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
    if (this.symbolChanged) {
      if (this.sciChartSurface && this.CandlestickData.length !== 0 && this.SolidityModel && this.ChartTimeframe) {
        refillCandleStickChart(
          this.CandlestickData,
          this.sciChartSurface,
          this.xAxis,
          this.candlestickSeries,
          this.volumeSeries,
          this.SolidityModel,
          this.ChartTimeframe
        )
      }
    }

    if (changes["StreamLastCandle"]) {
      if (this.StreamLastCandle) {
        updateCandlestickChart(
          this.sciChartSurface,
          this.StreamLastCandle,
          this.candlestickSeries,
          this.volumeSeries,
          this.yAxis
        )
      }
    }

    this.symbolChanged = !!changes["SolidityModel"] || !!changes["ChartTimeframe"];
  }
}
