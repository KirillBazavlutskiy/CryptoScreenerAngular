import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {
  CursorModifier,
  DateTimeNumericAxis,
  EAutoRange,
  ENumericFormat,
  EXyDirection,
  FastCandlestickRenderableSeries,
  HorizontalLineAnnotation,
  MouseWheelZoomModifier,
  NumericAxis,
  OhlcDataSeries,
  SciChartSurface,
  SmartDateLabelProvider,
  ZoomExtentsModifier,
  ZoomPanModifier
} from 'scichart';
import {CandlestickBinanceData, CandleStickDataChartModel} from "../../../models/CandlestickData.model";
import {TSciChart} from "scichart/types/TSciChart";

async function initCandlestickChart(chartId: string) {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartId, {
    theme: {
      type: "Dark"
    }
  });

  const xAxis = new DateTimeNumericAxis(wasmContext, {
    labelProvider: new SmartDateLabelProvider({
      labelFormat: ENumericFormat.Date_HHMMSS
    })
  })
  const yAxis = new NumericAxis(wasmContext, {
    autoRange: EAutoRange.Always,
    labelFormat: ENumericFormat.Decimal,
    cursorLabelFormat: ENumericFormat.Decimal,
    labelPrecision: 3,
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
    crosshairStroke: "#CCC",
    axisLabelStroke: "#FFF",
    axisLabelFill: "#CCC"
  })

  sciChartSurface.chartModifiers.add(zoomPanModifier, new ZoomExtentsModifier(), cursorModifier, mouseWheelZoomModifier);
  return { wasmContext, sciChartSurface };
}


@Component({
  selector: 'app-canvas-candlestick-chart',
  template: '<div class="w-full h-full" [id]="canvasId"></div>',
  standalone: true,
})

export class CanvasCandleStickChartComponent implements OnDestroy, OnChanges, AfterViewInit {
  @Input() canvasId!: string;
  @Input() CandlestickData!: CandlestickBinanceData[];
  @Input() SolidityPrice!: string | null;

  sciChartSurface!: SciChartSurface;
  CandlestickDataCanvas!: CandleStickDataChartModel;
  wasmContext!: TSciChart;

  ngOnDestroy() {
    console.log("Angular: ngOnDestroy");
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
    if (this.sciChartSurface && this.CandlestickData.length !== 0) {
      this.updateChartData();
    }

    if (this.sciChartSurface && this.SolidityPrice) {
      this.sciChartSurface.annotations.clear();

      const horizontalLineAnnotation = new HorizontalLineAnnotation({
        y1: Number(this.SolidityPrice),
        stroke: '#FFA800',
        strokeThickness: 2,
        showLabel: true,
      });

      this.sciChartSurface.annotations.add(horizontalLineAnnotation);
    }
  }

  private updateChartData() {
    this.CandlestickDataCanvas = {
      xValues: this.CandlestickData.map(candle => new Date(candle.openTime).getTime()),
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
