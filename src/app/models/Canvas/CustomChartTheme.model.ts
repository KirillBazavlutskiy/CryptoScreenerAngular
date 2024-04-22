import {IThemeProvider, TGradientStop} from "scichart";

export class CustomChartTheme implements IThemeProvider {
  sciChartBackground = "#111827"
  // Фон сетки
  gridBackgroundBrush = "#fff";
  // Фон захватов аннотаций (например, при изменении размеров аннотаций)
  annotationsGripsBackroundBrush: string = "#fff";
  // Цвет границ захватов аннотаций
  annotationsGripsBorderBrush: string = "#2563e8";
  // Заливка 3D осей
  axis3DBandsFill: string = "#fff";
  // Заливка полос осей
  axisBandsFill: string = "#2563e8";
  // Цвет границы осей
  axisBorder: string = "#fff";
  // Фон плоскости осей
  axisPlaneBackgroundFill: string = "#fff";
  // Цвет заголовков осей
  axisTitleColor: string = "#fff";
  // Цвет заголовка графика
  chartTitleColor: string = "#000";
  // Заливка колонок (используется в гистограммах)
  columnFillBrush: string = "#2563e8";
  // Цвет линии колонок (используется в гистограммах)
  columnLineColor: string = "#000";
  // Цвет линии курсора
  cursorLineBrush: string = "#000";
  // Цвета градиента по умолчанию
  defaultColorMapBrush: TGradientStop[] = [{
    offset: 0,
    color: "#fff"
  }, {
    offset: 1,
    color: "#2563e8"
  }];
  // Заливка области между линией и осью X
  downBandSeriesFillColor: string = "#2563e8";
  // Цвет линии между линией и осью X
  downBandSeriesLineColor: string = "#000";
  // Заливка свечей при повышении цены
  upBodyBrush: string = "#fff";
  // Цвет тени свечи при повышении цены
  upWickColor: string = "#fff";
  // Заливка свечей при снижении цены
  downBodyBrush: string = "#2563e8";
  // Цвет тени свечи при снижении цены
  downWickColor: string = "#2563e8";
  // Цвет границы сетки
  gridBorderBrush: string = "#000";
  // Фон текста меток
  labelBackgroundBrush: string = "#fff";
  // Цвет границы текста меток
  labelBorderBrush: string = "#000";
  // Цвет текста меток
  labelForegroundBrush: string = "#000";
  // Заливка фона легенды
  legendBackgroundBrush: string = "#fff";
  // Цвет линии серии графика
  lineSeriesColor: string = "#2563e8";
  // Цвет фона анимации загрузки
  loadingAnimationBackground: string = "#fff";
  // Цвет анимации загрузки
  loadingAnimationForeground: string = "#000";
  // Цвет основных линий сетки
  majorGridLineBrush: string = "#000";
  // Цвет вспомогательных линий сетки
  minorGridLineBrush: string = "#888";
  // Заливка горной области (например, при использовании AreaSeries)
  mountainAreaBrush: string = "#2563e8";
  // Цвет линии горной области
  mountainLineColor: string = "#000";
  // Заливка обзора графика
  overviewFillBrush: string = "#fff";
  // Цвет границы плоскости осей
  planeBorderColor: string = "#000";
  // Цвет линии при наведении курсора
  rolloverLineBrush: string = "#2563e8";
  // Заливка рамки выделения (например, при использовании RubberBandXyZoomModifier)
  rubberBandFillBrush: string = "#2563e8";
  // Цвет границы рамки выделения
  rubberBandStrokeBrush: string = "#2563e8";
  // Заливка фона полосы прокрутки
  scrollbarBackgroundBrush: string = "#fff";
  // Цвет границы полосы прокрутки
  scrollbarBorderBrush: string = "#000";
  // Заливка фона ручек полосы прокрутки
  scrollbarGripsBackgroundBrush: string = "#2563e8";
  // Заливка фона области видимости полосы прокрутки
  scrollbarViewportBackgroundBrush: string = "#fff";
  // Цвет границы области видимости полосы прокрутки
  scrollbarViewportBorderBrush: string = "#000";
  // Цвет эффекта тени
  shadowEffectColor: string = "#000";
  // Фон текста аннотаций
  textAnnotationBackground: string = "#fff";
  // Цвет текста аннотаций
  textAnnotationForeground: string = "#000";
  // Цвет текста меток делений осей
  tickTextBrush: string = "#000";
  // Заливка области между линией и осью X
  upBandSeriesFillColor: string = "#fff";
  // Цвет линии между линией и осью X
  upBandSeriesLineColor: string = "#000";
}
