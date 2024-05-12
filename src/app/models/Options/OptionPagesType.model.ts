export type ActiveOptionsChapter =
  "SolidityFinderOptionsChapter" |
  "ChartOptionsChapter" |
  "SolidityTicketCardOptionsChapter"

export interface ActiveChapterModel {
  pageKey: ActiveOptionsChapter;
  buttonText: string;
}
