import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {
  CursorModifier,
  DateLabelProvider,
  DateTimeNumericAxis,
  EAutoRange,
  ECoordinateMode,
  EHorizontalAnchorPoint,
  ENumericFormat,
  EVerticalAnchorPoint,
  EXyDirection,
  FastCandlestickRenderableSeries,
  HorizontalLineAnnotation,
  MouseWheelZoomModifier,
  NumericAxis,
  OhlcDataSeries,
  SciChartSurface,
  SmartDateLabelProvider,
  TextAnnotation,
  ZoomExtentsModifier,
  ZoomPanModifier
} from 'scichart';
import {
  CandleChartInterval,
  CandlestickBinanceData,
  CandleStickDataChartModel
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

  const xAxis = new DateTimeNumericAxis(wasmContext, {
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

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  const candlestickSeries = new OhlcDataSeries(wasmContext, {
    xValues: [],
    openValues: [],
    highValues: [],
    lowValues: [],
    closeValues: []
  });

  candlestickSeries.containsNaN = false;
  candlestickSeries.isSorted = false;

  const candlestickRenderableSeries = new FastCandlestickRenderableSeries(wasmContext, {
    dataSeries: candlestickSeries
  });
  sciChartSurface.renderableSeries.add(candlestickRenderableSeries);

  const zoomPanModifier = new ZoomPanModifier({
    xyDirection: EXyDirection.XDirection
  });

  const mouseWheelZoomModifier = new MouseWheelZoomModifier({
    xyDirection: EXyDirection.XDirection
  })

  const cursorModifier = new CursorModifier({
    crosshairStroke: "#ccc",
    axisLabelStroke: "#fff",
    axisLabelFill: "#ccc",
  })

  sciChartSurface.chartModifiers.add(zoomPanModifier, new ZoomExtentsModifier(), cursorModifier, mouseWheelZoomModifier);
  return { wasmContext, sciChartSurface };
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
    opacity: 0.5
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
  CandlestickDataCanvas!: CandleStickDataChartModel;
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
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sciChartSurface && this.CandlestickData.length !== 0 && this.SolidityModel && this.ChartTimeframe) {
      console.log(this.CandlestickData);
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
    this.CandlestickDataCanvas = {
      xValues: this.CandlestickData.map(candle => new Date(candle.openTime).getTime() / 1000),
      openValues: this.CandlestickData.map(candle => Number(candle.open)),
      highValues: this.CandlestickData.map(candle => Number(candle.high)),
      lowValues: this.CandlestickData.map(candle => Number(candle.low)),
      closeValues: this.CandlestickData.map(candle => Number(candle.close))
    }

    const NewCandleStickDataSeries = new OhlcDataSeries(this.wasmContext, this.CandlestickDataCanvas)

    if (this.sciChartSurface) {
      const renderableSeries = this.sciChartSurface.renderableSeries.get(0); // Получаем первый (или единственный) рендеринг серии

      renderableSeries.dataSeries = NewCandleStickDataSeries;

      this.sciChartSurface.zoomExtents();
    }
  }

  cleanupSciChart() {
    if (this.sciChartSurface) {
      this.sciChartSurface.delete();
    }
  }
}
