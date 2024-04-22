export interface VolumeBarDataCanvasModel {
  xValues: number[] | undefined,
  yValues: number[] | undefined,
}

export type CandlestickBinanceData = [
  number,   // Open time
  string,   // Open
  string,   // High
  string,   // Low
  string,   // Close (or latest price)
  string,   // Volume
  number,   // Close time
  string,   // Base asset volume
  number,   // Number of trades
  string,   // Taker buy volume
  string,   // Taker buy base asset volume
  string    // Ignore.
]

export type CandleChartInterval =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '8h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1M'
