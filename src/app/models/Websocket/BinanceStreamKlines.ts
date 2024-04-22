// Интерфейс для объекта, получаемого по вебсокету
export interface WebSocketKlinesMessage {
  e: string;  // event type
  E: number;  // event time
  s: string;  // Option trading symbol
  k: KlineData; // кандл (свеча)
}

interface KlineData {
  t: number;  // kline start time
  T: number;  // kline end time
  s: string;  // Option trading symbol
  i: string;  // candle period
  F: number;  // first trade ID
  L: number;  // last trade ID
  o: string;  // open
  c: string;  // close
  h: string;  // high
  l: string;  // low
  v: string;  // volume(in contracts)
  n: number;  // number of trades
  x: boolean; // current candle has been completed Y/N
  q: string;  // completed trade amount (in quote asset)
  V: string;  // taker completed trade volume (in contracts)
  Q: string;  // taker trade amount (in quote asset)
}

// Интерфейс с более понятными именами полей
export interface CandlestickWebSocketModel {
  eventType: string;
  eventTime: number;
  symbol: string;
  kline: WebSocketKlineModel;
}

export interface WebSocketKlineModel {
  startTime: number;
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
}
