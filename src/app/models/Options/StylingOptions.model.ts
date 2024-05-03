export interface PaintingLevel {
  value: number,
  color: string;
}

export interface StylingOptionsModel {
  upToPrice: {
    asks: PaintingLevel[],
    bids: PaintingLevel[]
  },
  solidityRatio: PaintingLevel[]
}
