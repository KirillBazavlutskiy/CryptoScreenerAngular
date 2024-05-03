import {
  CategoryAxis,
  CursorModifier,
  EAutoRange,
  ENumericFormat,
  EXyDirection,
  FastCandlestickRenderableSeries,
  FastColumnRenderableSeries, HorizontalLineAnnotation,
  MouseWheelZoomModifier,
  NumberRange,
  NumericAxis, NumericLabelProvider,
  OhlcDataSeries,
  SciChartSurface,
  SmartDateLabelProvider,
  XyDataSeries,
  ZoomExtentsModifier,
  ZoomPanModifier
} from "scichart";
import {CustomChartTheme} from "../../../models/Canvas/CustomChartTheme.model";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {WebSocketKlineModel} from "../../../models/Websocket/Binance/StreamKlines";
import {CandlestickBinanceData} from "../../../models/RestApi/Binance/Klines.model";

function formatAxisValue(value: number): number {
  if (value === 0) return 0;
  const strValue = value.toString();
  if (!strValue.includes(".")) return 0;
  const dotIndex = strValue.indexOf(".");
  return strValue.length - dotIndex - 1;
}

export async function initEmptyCandlestickChart(chartId: string) {
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
      autoRange: EAutoRange.Always,
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
    },
    axis: {
      yAxis,
      xAxis
    }
  };
}

export const refillCandleStickChart = (
  CandlestickData: CandlestickBinanceData[],
  sciChartSurface: SciChartSurface,
  candlestickDataSeries: OhlcDataSeries,
  volumeDataSeries: XyDataSeries,
  solidityInfo: SolidityModel,
  yAxis: NumericAxis,
  tickSize: number
) => {
  const xValues = CandlestickData.map(candle => new Date(candle[0]).getTime() / 1000);
  const openValues = CandlestickData.map(candle => Number(candle[1]));
  const highValues = CandlestickData.map(candle => Number(candle[2]));
  const lowValues = CandlestickData.map(candle => Number(candle[3]));
  const closeValues = CandlestickData.map(candle => Number(candle[4]));
  const volumeValues = CandlestickData.map(candle => Number(candle[5]));

  candlestickDataSeries.clear();
  candlestickDataSeries.appendRange(
    xValues,
    openValues,
    highValues,
    lowValues,
    closeValues
  );

  volumeDataSeries.clear();
  volumeDataSeries.appendRange(xValues, volumeValues);

  sciChartSurface.annotations.clear();

  const horizontalLineAnnotation = new HorizontalLineAnnotation({
    y1: Number(solidityInfo.Solidity.Price),
    stroke: '#fff',
    strokeThickness: 3,
    showLabel: true,
    axisLabelFill: "#2563e8",
    axisLabelStroke: "#fff"
  });

  yAxis.labelProvider = new NumericLabelProvider({
    labelPrecision: formatAxisValue(tickSize)
  })

  sciChartSurface.annotations.add(horizontalLineAnnotation);

  sciChartSurface.zoomExtents();
}

export const updateCandlestickChart = (
  sciChartSurface: SciChartSurface,
  lastCandle: WebSocketKlineModel,
  candlestickDataSeries: OhlcDataSeries,
  volumeDataSeries: XyDataSeries,
  yAxis: NumericAxis
) => {
  const currentIndex = candlestickDataSeries.count() - 1;
  const getLatestCandleDate = candlestickDataSeries.getNativeXValues().get(currentIndex);
  if (lastCandle.startTime / 1000 === getLatestCandleDate) {
    candlestickDataSeries.update(
      currentIndex,
      Number(lastCandle.open),
      Number(lastCandle.high),
      Number(lastCandle.low),
      Number(lastCandle.close)
    );
    volumeDataSeries.update(currentIndex, Number(lastCandle.volume));
  } else {
    candlestickDataSeries.append(
      lastCandle.startTime / 1000,
      Number(lastCandle.open),
      Number(lastCandle.high),
      Number(lastCandle.low),
      Number(lastCandle.close)
    );
    volumeDataSeries.append(lastCandle.startTime / 1000, Number(lastCandle.volume));
  }

  yAxis.growBy = new NumberRange(0.1, 0.1);
  sciChartSurface.invalidateElement();
}

export const cleanupSciChart = (sciChartSurface: SciChartSurface) => {
  sciChartSurface.delete();
}
