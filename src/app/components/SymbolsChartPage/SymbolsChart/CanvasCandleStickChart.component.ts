import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {
  CursorModifier,
  EAutoRange,
  ECoordinateMode,
  EHorizontalAnchorPoint,
  ENumericFormat,
  EVerticalAnchorPoint,
  EXyDirection,
  FastCandlestickRenderableSeries, FastColumnRenderableSeries,
  HorizontalLineAnnotation,
  MouseWheelZoomModifier, NumberRange,
  NumericAxis,
  OhlcDataSeries,
  SciChartSurface,
  SmartDateLabelProvider,
  TextAnnotation, XyDataSeries,
  ZoomExtentsModifier,
  ZoomPanModifier,
  CategoryAxis
} from 'scichart';
import {
  CandleChartInterval,
  CandlestickBinanceData
} from "../../../models/CandlestickData.model";
import {TSciChart} from "scichart/types/TSciChart";
import {CustomChartTheme} from "../../../models/CustomChartTheme.model";
import {SolidityModel} from "../../../models/SolidityFinderModels.model";

async function initCandlestickChart(chartId: string) {
  SciChartSurface.useWasmFromCDN();
  SciChartSurface.UseCommunityLicense()
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartId, {
    theme: {
      type: "Dark"
    },
  });

  const customChartTheme = new CustomChartTheme();

  sciChartSurface.applyTheme(customChartTheme);

  const xAxis = new CategoryAxis(wasmContext, {
    labelProvider: new SmartDateLabelProvider(),
    labelStyle: {
      color: "#fff"
    },
    majorTickLineStyle: { strokeThickness: 1, color: "#fff", tickSize: 8},
    minorTickLineStyle: { strokeThickness: 1, color: "#fff", tickSize: 4},
    axisBorder: {
      borderTop: 1,
      color: "#fff"
    }
  })

  const yAxis = new NumericAxis(wasmContext, {
    autoRange: EAutoRange.Always,
    labelFormat: ENumericFormat.Decimal,
    cursorLabelFormat: ENumericFormat.Decimal,
    growBy: new NumberRange(0.1, 0.1),
    labelPrecision: 3,
    labelStyle: {
      color: "#fff"
    },
    majorTickLineStyle: { strokeThickness: 1, color: "#fff", tickSize: 8},
    minorTickLineStyle: { strokeThickness: 1, color: "#fff", tickSize: 4},
    axisBorder: {
      borderLeft: 1,
      color: "#fff"
    }
  })

  const volumeYAxis = new NumericAxis(
    wasmContext,
    {
      id: "VolumeAxisId",
      isVisible: false,
      growBy: new NumberRange(0, 4)
    })

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);
  sciChartSurface.yAxes.add(volumeYAxis);

  const candlestickSeries = new OhlcDataSeries(wasmContext, {
    xValues: [],
    openValues: [],
    highValues: [],
    lowValues: [],
    closeValues: [],
    containsNaN: false,
    isSorted: false
  });

  const volumeSeries = new XyDataSeries(wasmContext, {
    xValues: [],
    yValues: [],
    containsNaN: false,
    isSorted: false,
  })

  const candlestickRenderableSeries = new FastCandlestickRenderableSeries(wasmContext, {
    dataSeries: candlestickSeries
  });

  const volumeRenderableSeries = new FastColumnRenderableSeries(wasmContext, {
    dataSeries: volumeSeries,
    yAxisId: "VolumeAxisId",
    strokeThickness: 0,
    dataPointWidth: 0.7,
    opacity: 0.3,
    fill: "#fff"
  });

  sciChartSurface.renderableSeries.add(candlestickRenderableSeries);
  sciChartSurface.renderableSeries.add(volumeRenderableSeries);

  const zoomPanModifier = new ZoomPanModifier({
    xyDirection: EXyDirection.XDirection
  });

  const mouseWheelZoomModifier = new MouseWheelZoomModifier({
    xyDirection: EXyDirection.XDirection,
  })

  const cursorModifier = new CursorModifier({
    crosshairStroke: "#ccc",
    axisLabelStroke: "#fff",
    axisLabelFill: "#ccc",
  })

  sciChartSurface.chartModifiers.add(zoomPanModifier, new ZoomExtentsModifier(), cursorModifier, mouseWheelZoomModifier);

  return {
    wasmContext,
    sciChartSurface,
    dataSeries: {
      candlestickSeries,
      volumeDataSeries: volumeSeries
    }
  };
}

const CreateWatermark = (text: string) => {
  return new TextAnnotation({
    x1: 0.5,
    y1: 0.5,
    xCoordinateMode: ECoordinateMode.Relative,
    yCoordinateMode: ECoordinateMode.Relative,
    horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
    verticalAnchorPoint: EVerticalAnchorPoint.Center,
    text: text,
    fontSize: 32,
    fontWeight: 'Bold',
    textColor: "#888888",
    opacity: 0.5,
  });
}

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

  sciChartSurface!: SciChartSurface;

  candlestickSeries!: OhlcDataSeries;
  volumeSeries!: XyDataSeries;

  wasmContext!: TSciChart;

  ngOnDestroy() {
    this.cleanupSciChart();
  }

  ngAfterViewInit() {
    if (this.canvasId) {
      this.cleanupSciChart();
      initCandlestickChart(this.canvasId).then(res => {
        this.wasmContext = res.wasmContext
        this.sciChartSurface = res.sciChartSurface
        this.candlestickSeries = res.dataSeries.candlestickSeries;
        this.volumeSeries = res.dataSeries.volumeDataSeries;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sciChartSurface && this.CandlestickData.length !== 0 && this.SolidityModel && this.ChartTimeframe) {
      this.updateChartData();

      this.sciChartSurface.annotations.clear();

      const horizontalLineAnnotation = new HorizontalLineAnnotation({
        y1: Number(this.SolidityModel.Solidity.Price),
        stroke: '#fff',
        strokeThickness: 3,
        showLabel: true,
        axisLabelFill: "#2563e8",
        axisLabelStroke: "#fff"
      });

      this.sciChartSurface.annotations.add(horizontalLineAnnotation);
      this.sciChartSurface.annotations.add(CreateWatermark(`${this.SolidityModel.Symbol} | ${this.ChartTimeframe.toUpperCase()}`))
    }
  }

  private updateChartData() {
    if (this.sciChartSurface) {
      const xValues = this.CandlestickData.map(candle => new Date(candle[0]).getTime() / 1000);
      const openValues = this.CandlestickData.map(candle => Number(candle[1]));
      const highValues = this.CandlestickData.map(candle => Number(candle[2]));
      const lowValues = this.CandlestickData.map(candle => Number(candle[3]));
      const closeValues = this.CandlestickData.map(candle => Number(candle[4]));
      const volumeValues = this.CandlestickData.map(candle => Number(candle[5]));

      this.candlestickSeries.clear();
      this.candlestickSeries.appendRange(
        xValues,
        openValues,
        highValues,
        lowValues,
        closeValues
      );

      this.volumeSeries.clear();
      this.volumeSeries.appendRange(xValues, volumeValues);

      this.sciChartSurface.zoomExtents();
    }
  }



  cleanupSciChart() {
    if (this.sciChartSurface) {
      this.sciChartSurface.delete();
    }
  }
}
