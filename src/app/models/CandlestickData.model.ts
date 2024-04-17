export interface CandleStickDataChartModel {
  xValues: number[] | undefined,
  openValues: number[] | undefined,
  highValues: number[] | undefined,
  lowValues: number[] | undefined,
  closeValues: number[] | undefined
}

export interface CandlestickBinanceData {
  openTime: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: number,
  quoteVolume: string,
  trades: number,
  baseAssetVolume: string,
  quoteAssetVolume: string
}

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
