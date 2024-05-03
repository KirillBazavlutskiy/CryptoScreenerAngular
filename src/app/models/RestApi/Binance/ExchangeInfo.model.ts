interface PriceFilter {
  filterType: 'PRICE_FILTER';
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

interface LotSizeFilter {
  filterType: 'LOT_SIZE';
  minQty: string;
  maxQty: string;
  stepSize: string;
}

interface MinNotionalFilter {
  filterType: 'MIN_NOTIONAL';
  minNotional: string;
  applyToMarket: boolean;
  avgPriceMins?: number;
}

interface IcebergPartsFilter {
  filterType: 'ICEBERG_PARTS';
  limit: number;
}

interface MaxNumOrdersFilter {
  filterType: 'MAX_NUM_ORDERS' | 'MAX_NUM_ALGO_ORDERS' | 'MAX_NUM_ICEBERG_ORDERS';
  limit: number;
}

interface MaxPositionFilter {
  filterType: 'MAX_POSITION';
  maxPosition: string;
}

type ExchangeInfoSymbolFilter = PriceFilter | LotSizeFilter | MinNotionalFilter | IcebergPartsFilter | MaxNumOrdersFilter | MaxPositionFilter;

export interface ExchangeInfoSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: ExchangeInfoSymbolFilter[];
  permissions: string[];
}

export interface ExchangeInfoModel {
  timezone: string;
  serverTime: number;
  rateLimits: any[];
  exchangeFilters: any[];
  symbols: ExchangeInfoSymbol[];
}
