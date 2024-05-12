export interface PaintingBreakpoint {
  value: number,
  color: string;
}

export interface StylingOptionsModel {
  upToPrice: {
    asks: PaintingBreakpoint[],
    bids: PaintingBreakpoint[]
  },
  solidityRatio: PaintingBreakpoint[]
}
